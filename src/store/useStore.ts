import { create } from 'zustand';

interface State {
  nickname: string;
  selectedChips: string[];
  step: number;

  setNickname: (name: string) => void;
  addChip: (chipId: string) => void;
  removeChip: (chipId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useStore = create<State>((set) => ({
  nickname: '',
  selectedChips: [],
  step: 0,

  setNickname: (name) => set({ nickname: name }),

  addChip: (chipId) =>
    set((state) => {
      if (state.selectedChips.includes(chipId)) return state;
      return { selectedChips: [...state.selectedChips, chipId] };
    }),

  removeChip: (chipId) =>
    set((state) => ({
      selectedChips: state.selectedChips.filter((id) => id !== chipId),
    })),

  nextStep: () => set((state) => ({ step: state.step + 1 })),

  prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1) })),

  reset: () => set({ nickname: '', selectedChips: [], step: 0 }),
}));
