import { create } from "zustand";

interface RequestTab {
  id: string;
  title: string;
  method: Method;
  url: string;
}

interface RequestTabStore {
  tabs: RequestTab[];
  activeTabId: string;
  addTab: (tab: Omit<RequestTab, "id">) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  editTab: (id: string, updates: Partial<Omit<RequestTab, "id">>) => void;
}

export const useRequestTabStore = create<RequestTabStore>((set) => ({
  tabs: [
    {
      id: "default-tab",
      title: "Untitled",
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos/1",
    },
  ],
  activeTabId: "default-tab",

  addTab: (tab) =>
    set((state) => {
      const id = crypto.randomUUID();
      return {
        tabs: [...state.tabs, { id, ...tab }],
        activeTabId: id,
      };
    }),

  editTab: (id, updates) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab
      ),
    })),

  removeTab: (id) =>
    set((state) => {
      if (state.tabs.length === 1) return state;
      const curIdx = state.tabs.findIndex((t) => t.id === id);

      const newTabs = state.tabs.filter((t) => t.id !== id);

      let activeId = state.activeTabId;
      if (state.activeTabId === id) {
        activeId = curIdx > 0 ? state.tabs[curIdx - 1].id : newTabs[0]?.id;
      }

      return {
        tabs: newTabs,
        activeTabId: activeId,
      };
    }),

  setActiveTab: (id) => set(() => ({ activeTabId: id })),
}));
