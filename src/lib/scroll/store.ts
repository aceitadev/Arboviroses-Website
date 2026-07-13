import { create } from 'zustand';
import type { SectionId } from '@/lib/sections';

interface NarrativeStore {
  activeId: SectionId;
  setActive: (id: SectionId) => void;
}

/** Estado React de baixa frequência (só muda ao trocar de seção). */
export const useNarrativeStore = create<NarrativeStore>((set) => ({
  activeId: 'abertura',
  setActive: (id) => set((state) => (state.activeId === id ? state : { activeId: id })),
}));
