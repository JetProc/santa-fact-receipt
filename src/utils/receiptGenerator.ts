import { questions } from '../data/questions';
import { commonEvents } from '../data/commonEvents';

export interface ReceiptItem {
  name: string;
  price: number;
  qty: number;
}

export interface ReceiptResult {
  nickname: string;
  items: ReceiptItem[];
  totalAmount: number;
  date: string;
  receiptNum: number;
}

// 랜덤 정수 생성 함수 (min ~ max)
const getRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 배열에서 무작위로 n개 뽑는 함수 (공통 이벤트용)
const getRandomSubarray = <T>(arr: T[], size: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

export const generateReceipt = (nickname: string, selectedChipIds: string[]): ReceiptResult => {
  let items: ReceiptItem[] = [];
  let totalAmount = 0;

  // 1. 사용자가 선택한 칩들을 영수증 항목으로 변환
  questions.forEach((q) => {
    q.chips.forEach((chip) => {
      if (selectedChipIds.includes(chip.id)) {
        // 해당 칩의 랜덤 멘트 중 하나 선택
        const randomText = chip.receiptTexts[Math.floor(Math.random() * chip.receiptTexts.length)];
        const randomPrice = getRandomPrice(chip.priceMin, chip.priceMax);

        items.push({
          name: randomText,
          price: randomPrice,
          qty: 1,
        });
        totalAmount += randomPrice;
      }
    });
  });

  // 2. 대국민 공감 항목(랜덤 이벤트) 3개 추가
  const randomEvents = getRandomSubarray(commonEvents, 3);
  randomEvents.forEach((event) => {
    items.push({
      name: event.name,
      price: event.price,
      qty: 1,
    });
    totalAmount += event.price;
  });

  // 3. 리스트 섞기 (선택 항목과 랜덤 항목이 자연스럽게 섞이도록)
  items = items.sort(() => 0.5 - Math.random());

  // 4. 고정 항목 추가 (숨쉬기 운동, 나이 세금 등) - 맨 위나 아래에 배치
  items.unshift({ name: '🌬️ 숨쉬기 운동 (기본)', price: 0, qty: 366 });

  // 5. 날짜 포맷팅
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(
    2,
    '0'
  )} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return {
    nickname,
    items,
    totalAmount,
    date: dateStr,
    receiptNum: Math.floor(Math.random() * 10000),
  };
};
