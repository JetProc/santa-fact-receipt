import { useMemo, useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { analytics } from '@vercel/analytics';

import { useStore } from '../store/useStore';
import { generateReceipt } from '../utils/receiptGenerator';
import { saveReceiptToDatabase } from '../lib/receiptService';
import Receipt from '../components/Receipt';

const Result = () => {
  const { nickname, selectedChips, persona, answers, reset } = useStore();

  const receiptRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const hasSavedRef = useRef(false);

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaperReady, setIsPaperReady] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const receiptData = useMemo(() => {
    if (!nickname || selectedChips.length === 0) return null;
    return generateReceipt(nickname, persona, selectedChips, answers);
  }, [nickname, persona, selectedChips, answers]);

  const totalItemsCount = receiptData ? receiptData.items.length : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaperReady(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // 영수증이 완성되면 Supabase에 저장
  useEffect(() => {
    if (isComplete && receiptData && !hasSavedRef.current) {
      hasSavedRef.current = true;

      // 영수증 완성 이벤트 추적
      analytics.track('receipt_completed', {
        nickname: receiptData.nickname,
        total_amount: receiptData.totalAmount,
        rank: receiptData.rank,
        item_count: receiptData.items.length,
      });

      const saveReceipt = async () => {
        try {
          const result = await saveReceiptToDatabase(receiptData);
          if (!result.success) {
            setSaveError('데이터 저장에 실패했습니다. 다시 시도해주세요.');
          } else {
            console.log('영수증이 성공적으로 저장되었습니다.');
            // 데이터베이스 저장 성공 이벤트
            analytics.track('receipt_saved', {
              nickname: receiptData.nickname,
            });
          }
        } catch (err) {
          console.error('저장 중 오류:', err);
          setSaveError('데이터 저장 중 오류가 발생했습니다.');
        }
      };

      saveReceipt();
    }
  }, [isComplete, receiptData]);

  const handleInteraction = () => {
    if (!receiptData || isComplete || !isPaperReady) return;

    if (navigator.vibrate) navigator.vibrate(10);

    if (visibleIndex < totalItemsCount) {
      setVisibleIndex((prev) => prev + 1);

      setTimeout(() => {
        receiptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    } else if (!showTotal) {
      setShowTotal(true);

      setTimeout(() => {
        if (scrollTargetRef.current) {
          // ✅ [수정] block: 'center' -> 'end'로 변경
          // 화면의 끝을 영수증의 끝에 맞춰서, 그 위에 있는 '총 금액'이 화면에 잘 들어오도록 함
          scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);

      setTimeout(() => {
        setIsComplete(true);
      }, 1500);
    }
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        width: 1080,
        height: 1920,
        pixelRatio: 1,
      });
      const link = document.createElement('a');
      link.download = `santa's-fact-receipt-${nickname}.png`;
      link.href = dataUrl;
      link.click();

      // 이미지 다운로드 이벤트 추적
      analytics.track('receipt_downloaded', {
        nickname: nickname,
      });
    } catch (err) {
      console.error(err);
      alert('저장 실패ㅠㅠ 캡처해주세요!');
    }
  };

  if (!receiptData) return <div>로딩중...</div>;

  return (
    <div
      onClick={handleInteraction}
      className='flex flex-col items-center min-h-full pb-52 cursor-pointer select-none relative'
    >
      {/* 🖨️ 프린터 헤드 (화면 표시용) */}
      <div className='sticky top-0 left-0 w-full h-[60px] bg-[#D32F2F] z-40 flex flex-col shadow-xl border-b-4 border-[#1A1A1A]'>
        <div className='flex-1 w-full flex items-center justify-center z-50'>
          {!isPaperReady && (
            <div className='text-white font-bold text-sm tracking-widest flex items-center'>
              🖨️ <span className='ml-2 animate-dots'>영수증 출력중</span>
            </div>
          )}
          {isPaperReady && !isComplete && (
            <div className='animate-pulse text-[#D32F2F] font-bold bg-white border-2 border-black px-4 py-1 rounded-full shadow-md text-xs'>
              화면 터치하여 항목 확인하기
            </div>
          )}
          {isComplete && (
            <div className='animate-bounce text-[#D32F2F] font-bold bg-white border-2 border-black px-4 py-1 rounded-full shadow-md text-xs'>
              이미지를 저장하여 스토리에 공유하세요!
            </div>
          )}
        </div>
        <div className='w-full h-4 bg-[#1A1A1A] relative shrink-0'></div>
      </div>

      {/* 영수증 영역 (화면 표시용) */}
      <div className='w-full flex justify-center -mt-2 z-0'>
        <div className='animate-printer pt-4'>
          <div className={`transition-transform duration-300 ${showTotal ? 'scale-100' : 'scale-[0.98]'}`}>
            <Receipt ref={receiptRef} data={receiptData} visibleIndex={visibleIndex} showTotal={showTotal} />
            <div ref={scrollTargetRef} className='h-1 w-full'></div>
          </div>
        </div>
      </div>

      {/* 캡처용 숨겨진 영역*/}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div
          ref={exportRef}
          className='w-[1080px] h-[1920px] flex flex-col items-center justify-center relative overflow-hidden p-10'
          style={{
            backgroundColor: '#D32F2F',
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(248, 241, 229, 0.2) 2px, transparent 2.5px),
              radial-gradient(circle at 50% 50%, rgba(248, 241, 229, 0.15) 4px, transparent 5px),
              repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 10px)
            `,
            backgroundSize: '30px 30px, 60px 60px, auto',
            backgroundPosition: '0 0, 15px 15px, 0 0',
          }}
        >
          {/* 비네팅 및 테두리 */}
          <div
            className='absolute inset-0 pointer-events-none'
            style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)' }}
          ></div>
          <div className='absolute inset-6 border-4 border-dashed border-[#F8F1E5]/40 pointer-events-none rounded-3xl z-0'></div>

          {/* 메인 컨텐츠 */}
          <div className='transform scale-[1.4] flex flex-col items-center drop-shadow-2xl relative z-10'>
            <div className='text-center mb-10 shrink-0'>
              <h1 className='text-5xl font-bold font-receipt text-[#F8F1E5] tracking-tighter mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]'>
                2025 Santa's Fact Check
              </h1>
              <p className='text-2xl font-receipt text-[#F8F1E5]/90 drop-shadow-sm'>산타가 보낸 팩폭 청구서</p>
            </div>

            <div className='-translate-x-30'>
              <Receipt data={receiptData} visibleIndex={9999} showTotal={true} />
            </div>
          </div>

          <img
            src='/santa4.png'
            alt='Santa'
            className='absolute bottom-18 right-12 w-70 drop-shadow-2xl z-20 transform rotate-[-5deg]'
          />
        </div>
      </div>

      {/* 하단 버튼 그룹 */}
      <div
        className={`
        fixed left-0 w-full p-4 bottom-[60px]
        bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent 
        transition-all duration-500 z-40 
        ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
      >
        {saveError && (
          <div className='mb-3 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 text-sm font-bold'>
            ⚠️ {saveError}
          </div>
        )}
        <div className='w-full max-w-[480px] mx-auto flex gap-3'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('첫 화면으로 돌아가시겠습니까?')) {
                reset();
              }
            }}
            className='flex-1 py-4 bg-white text-black border-2 border-black font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2'
          >
            🔄 처음으로
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className='flex-[2] py-4 bg-[#D32F2F] text-white border-2 border-black font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 animate-bounce'
          >
            <span>📸 이미지 저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
