import { forwardRef } from 'react';
import type { ReceiptResult } from '../utils/receiptGenerator';
import { useNumberRolling } from '../hooks/useNumberRolling';
import ReceiptItem from './ReceiptItem';

interface Props {
  data: ReceiptResult;
  visibleIndex: number;
  showTotal: boolean;
}

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
      {/* 상단 톱니 */}
      <div
        className='w-full h-3'
        style={{
          background: `
            linear-gradient(to bottom right, transparent 50%, ${colors.paper} 50%), 
            linear-gradient(to bottom left, transparent 50%, ${colors.paper} 50%)
          `,
          backgroundSize: '12px 12px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'top center',
        }}
      />

      {/* 몸통 */}
      <div className='flex-1 px-6 py-2 relative' style={{ backgroundColor: colors.paper }}>
        {/* 종이 질감 (CSS SVG) */}
        <div
          className='absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 헤더 */}
        <div className='flex flex-col items-center mb-6 gap-1 text-center relative z-10'>
          <div className='text-2xl mb-1'>🎅</div>
          <h1 className='text-3xl font-bold tracking-tighter' style={{ color: colors.red }}>
            SANTA CORP.
          </h1>
          <div className='text-[10px] uppercase tracking-widest font-bold' style={{ color: colors.brown }}>
            Official Christmas Receipt
          </div>
          <div
            className='w-full h-1 mt-3'
            style={{
              background: `repeating-linear-gradient(45deg, ${colors.red}, ${colors.red} 10px, ${colors.green} 10px, ${colors.green} 20px)`,
            }}
          />
        </div>

        {/* 메타 정보 */}
        <div className='flex justify-between text-[11px] mb-6 uppercase font-bold tracking-wide relative z-10'>
          <div className='flex flex-col gap-1'>
            <span>📅 {data.date.split(' ')[0]}</span>
            <span>⏰ {data.date.split(' ')[1]}</span>
          </div>
          <div className='flex flex-col text-right gap-1'>
            <span>NO. 2024-{data.receiptNum}</span>
            <span style={{ color: colors.red }}>TO. {data.nickname}</span>
          </div>
        </div>

        {/* 품목 헤더 */}
        <div
          className='flex justify-between items-center border-b-2 border-dashed pb-2 mb-3 text-xs font-bold tracking-wider relative z-10'
          style={{ borderColor: colors.green }}
        >
          <span>ITEM</span>
          <span>PRICE</span>
        </div>

        {/* 리스트 */}
        <div className='flex flex-col gap-2 mb-4 text-sm flex-1 relative z-10'>
          {data.items.map(
            (item, idx) => idx < visibleIndex && <ReceiptItem key={idx} name={item.name} price={item.price} />
          )}
        </div>

        {/* 합계 및 도장 */}
        {showTotal && (
          <div className='animate-typewriter mt-auto relative z-10'>
            <div className='w-full border-b-4 border-double mb-4' style={{ borderColor: colors.green }}></div>

            <div className='flex justify-between items-end mb-8 relative'>
              <span className='text-xl font-bold'>TOTAL</span>
              <span className='text-3xl font-extrabold tabular-nums tracking-tight' style={{ color: colors.red }}>
                {animatedTotal.toLocaleString()} 원
              </span>

              <div
                className='absolute -top-6 left-2 border-4 rounded-full w-28 h-28 flex items-center justify-center animate-stamp z-50'
                style={{
                  borderColor: 'rgba(211, 47, 47, 0.6)',
                  color: 'rgba(211, 47, 47, 0.8)',
                  backgroundColor: 'transparent',
                  mixBlendMode: 'multiply',
                  animationDelay: '1.5s',
                  animationFillMode: 'forwards',
                  opacity: 0,
                }}
              >
                <div className='text-center transform -rotate-12'>
                  <span className='block text-xs font-bold'>VERIFIED BY</span>
                  <span className='text-xl font-black'>{data.totalAmount > 0 ? 'PENALTY' : 'NICE GIFT'}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center gap-3'>
              <div
                className='h-10 w-full opacity-80'
                style={{
                  background: `repeating-linear-gradient(90deg, ${colors.green}, ${colors.green} 2px, transparent 2px, transparent 4px)`,
                }}
              />
              <p className='text-[10px] text-center font-bold' style={{ color: colors.brown }}>
                * MERRY CHRISTMAS & HAPPY NEW YEAR *<br />
                문의: 북극 산타 마을 1번지
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 하단 톱니 */}
      <div
        className='w-full h-3'
        style={{
          background: `
            linear-gradient(to top right, transparent 50%, ${colors.paper} 50%), 
            linear-gradient(to top left, transparent 50%, ${colors.paper} 50%)
          `,
          backgroundSize: '12px 12px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom center',
        }}
      />
    </div>
  );
});

export default Receipt;
