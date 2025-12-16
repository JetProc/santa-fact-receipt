import { forwardRef } from 'react';
import type { ReceiptResult } from '../utils/receiptGenerator';
import { useNumberRolling } from '../hooks/useNumberRolling';
import ReceiptItem from './ReceiptItem';

interface Props {
  data: ReceiptResult;
  visibleIndex: number;
  showTotal: boolean;
}

const PAPER_TEXTURE_URL = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const SHARE_URL = 'https://santa-fact-receipt.vercel.app';

const Receipt = forwardRef<HTMLDivElement, Props>(({ data, visibleIndex, showTotal }, ref) => {
  const animatedTotal = useNumberRolling(data.totalAmount, 2000, showTotal);

  const colors = {
    paper: '#F8F1E5',
    green: '#004D40',
    red: '#D32F2F',
    brown: '#5D4037',
  };

  return (
    <div
      ref={ref}
      className='relative w-[340px] mx-auto flex flex-col font-receipt leading-relaxed select-none my-6'
      style={{
        color: colors.green,
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))',
      }}
    >
      {/* 종이 질감 */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply z-10'
        style={{ backgroundImage: PAPER_TEXTURE_URL }}
      />

      {/* 상단 톱니 */}
      <div
        className='w-full h-5'
        style={{
          background: `linear-gradient(to bottom right, transparent 50%, ${colors.paper} 50%), linear-gradient(to bottom left, transparent 50%, ${colors.paper} 50%)`,
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top center',
        }}
      />

      {/* 영수증 본문 */}
      <div className='flex-1 px-6 py-2 relative bg-[#F8F1E5]'>
        {/* 헤더 */}
        <div className='flex flex-col items-center mb-6 text-center relative z-20'>
          <img src='/santa3.png' alt='Santa' className='w-24 mb-2' />
          <h1 className='text-2xl font-bold tracking-tighter' style={{ color: colors.red }}>
            SANTA'S FACT RECEIPT
          </h1>
          <p className='text-[10px] uppercase tracking-widest font-bold text-[#5D4037]'>Official Annual Report 2025</p>
          <div
            className='w-full h-1 mt-3'
            style={{
              background: `repeating-linear-gradient(45deg, ${colors.red}, ${colors.red} 10px, ${colors.green} 10px, ${colors.green} 20px)`,
            }}
          />
        </div>

        {/* 메타 정보 */}
        <div className='flex justify-between text-[11px] mb-6 uppercase font-bold tracking-wide relative z-20'>
          <div className='flex flex-col gap-1'>
            <span>📅 {data.date.split(' ')[0]}</span>
            <span>⏰ {data.date.split(' ')[1]}</span>
          </div>
          <div className='flex flex-col text-right gap-1'>
            <span>NO. {data.receiptNum}</span>
            <span style={{ color: colors.red }}>TO. {data.nickname}</span>
          </div>
        </div>

        {/* 품목 리스트 헤더 */}
        <div
          className='flex justify-between items-center border-b-2 border-dashed pb-2 mb-3 text-xs font-bold tracking-wider relative z-20'
          style={{ borderColor: colors.green }}
        >
          <span>항목</span>
          <span>가격</span>
        </div>

        {/* 리스트 아이템 */}
        <div className='flex flex-col gap-2 mb-6 text-sm flex-1 relative z-20 min-h-[100px]'>
          {data.items.map(
            (item, idx) => idx < visibleIndex && <ReceiptItem key={idx} name={item.name} price={item.price} />
          )}
        </div>

        {/* 합계 및 결과 영역 */}
        {showTotal && (
          <div className='animate-typewriter mt-auto relative z-20'>
            <div className='w-full border-b-4 border-double mb-4' style={{ borderColor: colors.green }}></div>

            {/* 총 금액 */}
            <div className='flex justify-between items-end mb-6'>
              <span className='text-xl font-bold'>TOTAL</span>
              <span className='text-3xl font-extrabold tabular-nums tracking-tight' style={{ color: colors.red }}>
                {animatedTotal.toLocaleString()} ₩
              </span>
            </div>

            {/* 산타의 메시지 */}
            <div className='border-2 border-dashed border-[#5D4037] p-4 rounded-lg mb-6 relative bg-white/50 transform -rotate-1'>
              <p className='text-[10px] text-[#5D4037] font-bold mb-1 absolute -top-3 left-3 bg-[#F8F1E5] px-2'>
                SANTA'S MEMO 🎅
              </p>
              <p className='text-sm font-bold whitespace-pre-line leading-relaxed text-center text-[#1A1A1A]'>
                "{data.message}"
              </p>
            </div>

            {/* 해시태그 & QR코드 영역 */}
            <div className='flex items-end justify-between bg-white/40 p-3 rounded-lg border border-[#5D4037]/20'>
              {/* 왼쪽: 해시태그 & 등급 */}
              <div className='flex flex-col gap-2 flex-1'>
                <div className='flex flex-wrap gap-1'>
                  {data.hashtags.map((tag, i) => (
                    <span key={i} className='text-[10px] font-bold bg-[#004D40] text-white px-2 py-1 rounded-full'>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className='text-xs font-bold text-[#5D4037]'>
                  Rank: <span className='text-[#D32F2F]'>{data.rank}</span>
                </div>
              </div>

              {/* 오른쪽: QR코드 */}
              <div className='flex flex-col items-center gap-1 ml-2'>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                    SHARE_URL
                  )}&color=004d40`}
                  alt='QR Code'
                  className='w-14 h-14 mix-blend-multiply opacity-90'
                />
                <span className='text-[8px] font-bold tracking-tighter text-[#004D40]'>SCAN ME!</span>
              </div>
            </div>

            {/* 도장 애니메이션 */}
            <div
              className='absolute bottom-35 right-0 border-4 rounded-full w-24 h-24 flex flex-col items-center justify-center animate-stamp z-30 pointer-events-none'
              style={{
                borderColor: colors.red,
                color: colors.red,
                transform: 'rotate(-15deg)',
                mixBlendMode: 'multiply',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <span className='text-[8px] font-bold'>VERIFIED</span>
              <span className='text-sm font-black text-center leading-tight px-1 break-keep'>
                {data.rank.split(' ')[0]}
              </span>
            </div>

            <div className='text-center mt-6'>
              <p className='text-[9px] font-bold text-[#5D4037] opacity-60'>https://santa-fact-receipt.vercel.app</p>
            </div>
          </div>
        )}
      </div>

      {/* 하단 톱니 */}
      <div
        className='w-full h-5'
        style={{
          background: `linear-gradient(to top right, transparent 50%, ${colors.paper} 50%), linear-gradient(to top left, transparent 50%, ${colors.paper} 50%)`,
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom center',
        }}
      />
    </div>
  );
});

export default Receipt;
