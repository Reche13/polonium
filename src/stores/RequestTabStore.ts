import { create } from "zustand";

export type RowType = {
  id: string;
  key: string;
  value: string;
  description?: string;
  active: boolean;
};

export type RequestTab = {
  id: string;
  title: string;
  method: Method;
  url: string;
  selectedOptionNav: OptionsNav;
  queryParams?: RowType[];
  headers?: RowType[];
  bodyType: BodyType;
  body?: string;
  requestState: "NOT_STARTED" | "PENDING" | "COMPLETE" | "FAILED";
  SelectedResponseNav: ResponseNav;
  responseData?: string;
  responseDataType?: ResponseDataType;
  responseHeaders?: Record<string, string>[];
  responseCookies?: Record<string, string>[];
  responseTime?: number;
  responseStatus?: number;
  responseStatusText?: string;
  responseSize?: number;
};

interface RequestTabStore {
  tabs: RequestTab[];
  activeTabId: string;
  addTab: (tab: Omit<RequestTab, "id">) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  editTab: (id: string, updates: Partial<Omit<RequestTab, "id">>) => void;
  moveQueryParam: (tabId: string, fromIndex: number, toIndex: number) => void;
  moveHeader: (tabId: string, fromIndex: number, toIndex: number) => void;
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
      headers: [
        {
          id: crypto.randomUUID(),
          key: "",
          value: "",
          description: "",
          active: true,
        },
      ],
      bodyType: "none",
      requestState: "NOT_STARTED",
      SelectedResponseNav: "PRETTY",
    },
  ],
  activeTabId: "default-tab",

  addTab: (tab) =>
    set((state) => {
      const id = crypto.randomUUID();
      return {
        tabs: [
          ...state.tabs,
          {
            id,
            ...tab,
            headers: [
              {
                id: crypto.randomUUID(),
                key: "",
                value: "",
                description: "",
                active: true,
              },
            ],
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

  moveHeader: (tabId, fromIndex, toIndex) =>
    set((state) => ({
      tabs: state.tabs.map((tab) => {
        if (tab.id !== tabId) return tab;

        const newRows = [...tab.headers!!];
        const [movedItem] = newRows.splice(fromIndex, 1);
        newRows.splice(toIndex, 0, movedItem);

        return { ...tab, headers: newRows };
      }),
    })),
}));
