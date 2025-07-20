import { create } from 'zustand';

interface PriceState {
  result: any; // or define a proper type like `PriceResult`
  setResult: (data: any) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
}));
