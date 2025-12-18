import { supabase } from './supabase';
import type { ReceiptResult } from '../utils/receiptGenerator';

// ✅ [수정] answers와 actualPersona 인자 추가
export const saveReceiptToDatabase = async (
  receiptData: ReceiptResult,
  answers: Record<string, string>,
  actualPersona: string | null
) => {
  try {
    const { data, error } = await supabase.from('receipts').insert([
      {
        nickname: receiptData.nickname,
        persona: actualPersona || 'unknown',
        total_amount: receiptData.totalAmount,
        items: receiptData.items,
        answers: answers,
        receipt_num: receiptData.receiptNum,
        message: receiptData.message,
        hashtags: receiptData.hashtags,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase 저장 실패:', error);
      return { success: false, error };
    }

    console.log('영수증 저장 성공:', data);
    return { success: true, data };
  } catch (err) {
    console.error('영수증 저장 중 오류:', err);
    return { success: false, error: err };
  }
};
