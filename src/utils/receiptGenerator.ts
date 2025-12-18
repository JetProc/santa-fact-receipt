import { getAllChips, baseItems } from '../data/data';
import { type PersonaId } from '../data/types';

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
  rank: string;
  message: string;
  hashtags: string[];
}

const getResultAnalysis = (total: number) => {
  if (total < 50000) {
    return { rank: '알뜰 살림꾼 👼', message: '산타가 알뜰함에 놀랐습니다. \n 칭찬합니다!' };
  } else if (total < 150000) {
    return { rank: '평범한 시민 👤', message: '적당히 쓰고 적당히 살았군요. \n무난함 그 자체!' };
  } else if (total < 300000) {
    return { rank: '소비 요정 🧚', message: '통장이 텅장이 되는 마법.. \n조금만 자제해볼까요?' };
  } else if (total < 500000) {
    return { rank: '지름신 강림 🔥', message: '스트레스를 돈으로 풀었군요. \n산타는 다 압니다.' };
  } else {
    return { rank: '자본주의 괴물 🦖', message: '도대체 돈을 어디에 쓴 거죠? \n내년엔 선물 없습니다.' };
  }
};

export const generateReceipt = (
  nickname: string,
  persona: PersonaId | null,
  selectedChipIds: string[],
  answers: Record<string, string>
): ReceiptResult => {
  const items: ReceiptItem[] = [];
  let totalAmount = 0;

  const allChips = getAllChips();

  // 1. 베이스 아이템
  if (persona) {
    const myBaseItems = baseItems.filter((item) => item.targetPersonas.includes(persona));
    myBaseItems.forEach((item) => {
      items.push({ name: item.text, price: item.cost, qty: 1 });
      totalAmount += item.cost;
    });
  }

  // 2. 칩 아이템 처리
  const selectedLabels: string[] = [];

  selectedChipIds.forEach((chipId) => {
    const chip = allChips.find((c) => c.id === chipId);
    if (!chip) return;

    selectedLabels.push(chip.label);

    let candidates = chip.items;
    if (chip.type === 'select') {
      const userAnswer = answers[chipId];
      if (userAnswer) {
        candidates = candidates.filter((item) => !item.requiredAnswer || item.requiredAnswer === userAnswer);
      }
    }

    if (candidates.length === 0) return;

    const pickedItemData = candidates[Math.floor(Math.random() * candidates.length)];
    let finalText = pickedItemData.text;
    if (chip.type === 'input') {
      const userAnswer = answers[chipId] || '';
      finalText = finalText.replace('{input}', userAnswer);
    }

    items.push({ name: finalText, price: pickedItemData.cost, qty: 1 });
    totalAmount += pickedItemData.cost;
  });

  // 3. 해시태그 선정 (랜덤 3개)
  const shuffledLabels = selectedLabels.sort(() => 0.5 - Math.random());
  const hashtags = shuffledLabels.slice(0, 3).map((label) => `#${label}`);

  // 4. 결과 생성
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(
    2,
    '0'
  )} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const { rank, message } = getResultAnalysis(totalAmount);

  return {
    nickname,
    items,
    totalAmount,
    date: dateStr,
    receiptNum: Math.floor(Math.random() * 10000),
    rank,
    message,
    hashtags,
  };
};
