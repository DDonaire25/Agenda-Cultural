import { create } from 'zustand';

type View = 'search' | 'favorites' | 'create' | 'profile';

interface ViewStore {
  currentView: View;
  setView: (view: View) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: 'search',
  setView: (view) => set({ currentView: view }),
}));