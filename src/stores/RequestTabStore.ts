import { create } from "zustand";

type RowType = {
  id: string;
  key: string;
  value: string;
  description?: string;
  active: boolean;
};

interface RequestTab {
  id: string;
  title: string;
  method: Method;
  url: string;
  selectedOptionNav: OptionsNav;
  queryParams?: RowType[];
}

interface RequestTabStore {
  tabs: RequestTab[];
  activeTabId: string;
  addTab: (tab: Omit<RequestTab, "id">) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  editTab: (id: string, updates: Partial<Omit<RequestTab, "id">>) => void;
  setQueryParams: (tabId: string, rows: RowType[]) => void;
  updateQueryParam: (
    tabId: string,
    id: string,
    key: string,
    value: string
  ) => void;
  moveQueryParam: (tabId: string, fromIndex: number, toIndex: number) => void;
}

export const useRequestTabStore = create<RequestTabStore>((set) => ({
  tabs: [
    {
      id: "default-tab",
      title: "Untitled",
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      selectedOptionNav: "PARAMS",
      queryParams: [
        {
          id: crypto.randomUUID(),
          key: "",
          value: "",
          description: "",
          active: true,
        },
      ],
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

  // QUERY PARAMS
  setQueryParams: (tabId, rows) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, queryParams: rows } : tab
      ),
    })),

  updateQueryParam: (tabId, id, key, value) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              queryParams: tab.queryParams?.map((row) =>
                row.id === id ? { ...row, [key]: value } : row
              ),
            }
          : tab
      ),
    })),

  moveQueryParam: (tabId, fromIndex, toIndex) =>
    set((state) => ({
      tabs: state.tabs.map((tab) => {
        if (tab.id !== tabId) return tab;

        const newRows = [...tab.queryParams!!];
        const [movedItem] = newRows.splice(fromIndex, 1);
        newRows.splice(toIndex, 0, movedItem);

        return { ...tab, queryParams: newRows };
      }),
    })),
}));
