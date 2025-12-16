// 📌 'job_seeker' 타입 추가
export type PersonaId = 'student' | 'job_seeker' | 'worker' | 'god_life' | 'lover';
export type ChipType = 'normal' | 'input' | 'select';

export interface ReceiptItemData {
  text: string;
  cost: number;
  targetPersonas?: PersonaId[];
  requiredAnswer?: string;
}

export interface Chip {
  id: string;
  label: string;
  type: ChipType;
  question?: string;
  options?: string[];
  items: ReceiptItemData[];
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  chips: Chip[];
}

export interface Persona {
  id: PersonaId;
  label: string;
  desc: string;
}

export interface BaseItem {
  text: string;
  cost: number;
  targetPersonas: PersonaId[];
}
