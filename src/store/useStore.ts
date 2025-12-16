import { create } from 'zustand';
import { type PersonaId } from '../data/types';

interface State {
  nickname: string;
  step: number; // 0:Home, 1:Persona, 2:Chips, 3:Interrogation, 4:Result

  persona: PersonaId | null;
  selectedChips: string[];
  answers: Record<string, string>;

  setNickname: (name: string) => void;
  setPersona: (id: PersonaId) => void;

  toggleChip: (chipId: string) => void;
  setAnswer: (chipId: string, answer: string) => void;

  setStep: (step: number) => void;
  nextStep: () => void;
  reset: () => void;
}

export const useStore = create<State>((set) => ({
  nickname: '',
  step: 0,
  persona: null,
  selectedChips: [],
  answers: {},

  setNickname: (name) => set({ nickname: name }),

  setPersona: (id) => set({ persona: id }),

  toggleChip: (chipId) =>
    set((state) => {
      if (state.selectedChips.includes(chipId)) {
        return { selectedChips: state.selectedChips.filter((id) => id !== chipId) };
      }
      return { selectedChips: [...state.selectedChips, chipId] };
    }),

  setAnswer: (chipId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [chipId]: answer },
    })),

  setStep: (step) => set({ step }),

  nextStep: () => set((state) => ({ step: state.step + 1 })),

  reset: () =>
    set({
      nickname: '',
      step: 0,
      persona: null,
      selectedChips: [],
      answers: {},
    }),
}));
