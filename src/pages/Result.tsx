import { useMemo, useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';

import { useStore } from '../store/useStore';
import { generateReceipt } from '../utils/receiptGenerator';
import Receipt from '../components/Receipt';

const Result = () => {
  const { nickname, selectedChips, reset } = useStore();

  const receiptRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaperReady, setIsPaperReady] = useState(false);

  const receiptData = useMemo(() => {
    if (!nickname || selectedChips.length === 0) return null;
    return generateReceipt(nickname, selectedChips);
  }, [nickname, selectedChips]);

  const totalItemsCount = receiptData ? receiptData.items.length : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPaperReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = () => {
    if (!receiptData || isComplete || !isPaperReady) return;

    if (navigator.vibrate) navigator.vibrate(10);

    if (visibleIndex < totalItemsCount) {
      setVisibleIndex((prev) => prev + 1);

      // 자동 스크롤 (부드럽게 바닥으로)
      setTimeout(() => {
        receiptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    } else if (!showTotal) {
      setShowTotal(true);

      setTimeout(() => {
        if (scrollTargetRef.current) {
          scrollTargetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      setTimeout(() => {
        setIsComplete(true);
      }, 2000);
    }
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 1,
        width: 1080,
        height: 1920,
      });
      const link = document.createElement('a');
      link.download = `santa-receipt-${nickname}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('저장 실패! 캡처해주세요.');
    }
  };

  if (!receiptData) return <div>로딩중...</div>;

  return (
    <div
      onClick={handleInteraction}
      className='flex flex-col items-center min-h-full pb-32 cursor-pointer select-none relative'
    >
      {/* 프린터 헤드 */}
      <div className='sticky top-0 left-0 w-full h-[80px] bg-[#D32F2F] z-40 flex flex-col items-center justify-end shadow-xl border-b-4 border-[#1A1A1A]'>
        {/* 안내 문구 */}
        <div className='mb-3 z-50'>
          {isPaperReady && !isComplete && (
            <div className='animate-bounce text-[#D32F2F] font-bold bg-white border-2 border-black px-4 py-1 rounded-full shadow-md text-xs'>
              화면 터치하여 항목 확인하기
            </div>
          )}
        </div>

        {/* 배출구 */}
        <div className='w-full h-4 bg-[#1A1A1A] relative'></div>
      </div>

      {/* 영수증 영역 */}
      <div className='w-full flex justify-center -mt-2 z-0'>
        <div className='animate-printer pt-4'>
          {' '}
          <div className={`transition-transform duration-300 ${showTotal ? 'scale-100' : 'scale-[0.98]'}`}>
            <Receipt ref={receiptRef} data={receiptData} visibleIndex={visibleIndex} showTotal={showTotal} />
            <div ref={scrollTargetRef} className='h-1 w-full'></div>
          </div>
        </div>
      </div>

      {/* 숨겨진 캡처 영역 */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div
          ref={exportRef}
          className='w-[1080px] h-[1920px] bg-[#D32F2F] flex flex-col items-center justify-center relative p-20'
        >
          <div className='absolute top-32 text-center'>
            <h1 className='text-6xl font-bold font-receipt text-[#F8F1E5] tracking-tighter mb-4 drop-shadow-md'>
              2025 Santa's Fact Receipt
            </h1>
            <p className='text-3xl font-receipt text-[#F8F1E5]/80'>산타가 보낸 팩폭 청구서</p>
          </div>

          <div className='transform scale-[1.8] drop-shadow-2xl'>
            <Receipt data={receiptData} visibleIndex={9999} showTotal={true} />
          </div>
        </div>
      </div>

      {/* 하단 버튼 그룹 */}
      <div
        className={`
        fixed bottom-0 left-0 w-full p-6 
        bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent 
        flex flex-col gap-3 transition-all duration-500 z-50
        ${isComplete ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className='w-full max-w-[480px] mx-auto py-4 bg-[#D32F2F] text-white border-2 border-black font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 animate-bounce'
        >
          <span>📸 인스타 스토리 공유 이미지 저장</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            reset();
          }}
          className='w-full max-w-[480px] mx-auto py-3 text-gray-400 underline text-sm hover:text-black'
        >
          처음부터 다시 하기
        </button>
      </div>
    </div>
  );
};

export default Result;
