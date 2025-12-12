import { useNumberRolling } from '../hooks/useNumberRolling';

interface Props {
  name: string;
  price: number;
}

const ReceiptItem = ({ name, price }: Props) => {
  // 마운트되자마자(true) 0.9초(900ms) 동안 숫자가 올라감
  const animatedPrice = useNumberRolling(price, 900, true);

  return (
    <div className='flex justify-between items-start gap-2 animate-typewriter origin-left'>
      <span className='flex-1 break-keep leading-tight text-[13px]'>{name}</span>
      <span className='font-bold whitespace-nowrap text-[13px] tabular-nums'>
        {price === 0 ? '0' : animatedPrice.toLocaleString()} 원
      </span>
    </div>
  );
};

export default ReceiptItem;
