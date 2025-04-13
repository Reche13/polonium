import { create } from "zustand";
import { RequestTab, useRequestTabStore } from "./RequestTabStore";

interface CollectionStore {
  savedRequests: Record<string, SavedRequest>;
  collections: CollectionNode[];

  addFolder: (name: string, parentId: string | null) => void;
  updateFolderName: (folderId: string, newName: string) => void;
  addRequest: (req: Omit<SavedRequest, "id">, parentId: string | null) => void;
  duplicateRequest: (requestId: string) => void;
  updateRequest: (id: string, updates: Partial<SavedRequest>) => void;
  deleteNode: (id: string) => void;
  openRequestInTab: (requestId: string) => void;
  saveRequestFromTab: (tabId: string, parentFolderId?: string | null) => void;
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  savedRequests: {},
  collections: [],

  addFolder: (name, parentId) => {
    const folder: CollectionNode = {
      id: crypto.randomUUID(),
      type: "folder",
      name,
      children: [],
    };

    set((state) => ({
      collections: insertIntoTree(state.collections, folder, parentId),
    }));
  },

  updateFolderName: (folderId: string, newName: string) => {
    set((state) => ({
      collections: updateNodeInTree(state.collections, folderId, newName),
    }));
  },

  addRequest: (req, parentId) => {
    const id = crypto.randomUUID();
    const node: CollectionNode = {
      id: id,
      type: "request",
      requestId: id,
      method: req.method,
      name: req.title,
    };

    set((state) => ({
      savedRequests: {
        ...state.savedRequests,
        [id]: { ...req, id },
      },
      collections: insertIntoTree(state.collections, node, parentId),
    }));
  },

  duplicateRequest: (requestId: string) => {
    const { savedRequests, collections } = get();
    const original = savedRequests[requestId];
    if (!original) return;

    const newId = crypto.randomUUID();

    const duplicate: SavedRequest = {
      ...original,
      id: newId,
      title: `${original.title} Copy`,
    };

    const parentId = findParentId(collections, requestId);

    const newNode: CollectionNode = {
      id: newId,
      type: "request",
      requestId: newId,
      method: original.method,
      name: duplicate.title,
    };

    set((state) => ({
      savedRequests: {
        ...state.savedRequests,
        [newId]: duplicate,
      },
      collections: insertIntoTree(state.collections, newNode, parentId),
    }));
  },

  updateRequest: (id, updates) => {
    console.log(updates);
    set((state) => {
      const updatedSavedRequest = {
        ...state.savedRequests[id],
        ...updates,
      };
      const newCollections =
        updates.title || updates.method
          ? updateNodeInTree(
              state.collections,
              id,
              updates.title,
              updates.method
            )
          : state.collections;

      return {
        savedRequests: {
          ...state.savedRequests,
          [id]: updatedSavedRequest,
        },
        collections: newCollections,
      };
    });
  },

  deleteNode: (nodeId) =>
    set((state) => {
      const updatedTree = removeFromTree(state.collections, nodeId);
      return { collections: updatedTree };
    }),

  openRequestInTab: (requestId) => {
    const request = get().savedRequests[requestId];
    if (!request) return;

    useRequestTabStore.getState().addTab({
      ...request,
      requestState: "NOT_STARTED",
      selectedOptionNav: "PARAMS",
      SelectedResponseNav: "PRETTY",
    });
  },

  saveRequestFromTab: (tabId: string, parentFolderId?: string | null) => {
    const tab = useRequestTabStore.getState().tabs.find((t) => t.id === tabId);
    if (!tab) return;

    const parentId = parentFolderId ?? findParentId(get().collections, tabId);

    set((state) => {
      const isExisting = !!state.savedRequests[tab.id];
      const savedRequests = {
        ...state.savedRequests,
        [tab.id]: {
          ...state.savedRequests[tab.id],
          ...tab,
        },
      };

      const collections = isExisting
        ? updateNodeInTree(state.collections, tab.id, tab.title, tab.method)
        : insertIntoTree(
            state.collections,
            {
              id: tab.id,
              type: "request",
              requestId: tab.id,
              method: tab.method,
              name: tab.title || "Untitled",
            },
            parentId
          );

      return { savedRequests, collections };
    });
  },
}));

type SavedRequest = Omit<
  RequestTab,
  | "responseData"
  | "responseDataType"
  | "responseHeaders"
  | "responseCookies"
  | "responseTime"
  | "responseStatus"
  | "responseStatusText"
  | "responseSize"
>;

export type CollectionNode =
  | {
      id: string;
      type: "folder";
      name: string;
      children: CollectionNode[];
    }
  | {
      id: string;
      type: "request";
      requestId: string;
      method: Method;
      name: string;
    };

const insertIntoTree = (
  tree: CollectionNode[],
  node: CollectionNode,
  parentId: string | null
): CollectionNode[] => {
  if (!parentId) return [...tree, node];

  return tree.map((item) => {
    if (item.type === "folder") {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, node],
        };
      } else {
        return {
          ...item,
          children: insertIntoTree(item.children, node, parentId),
        };
      }
    }
    return item;
  });
};

const updateNodeInTree = (
  tree: CollectionNode[],
  nodeId: string,
  updatedName?: string,
  updatedMethod?: Method
): CollectionNode[] => {
  return tree.map((node) => {
    if (node.id === nodeId) {
      if (node.type === "request") {
        return {
          ...node,
          name: updatedName ?? node.name,
          method: updatedMethod ?? node.method,
        };
      } else {
        return {
          ...node,
          name: updatedName ?? node.name,
        };
      }
    }

    if (node.type === "folder") {
      return {
        ...node,
        children: updateNodeInTree(
          node.children,
          nodeId,
          updatedName,
          updatedMethod
        ),
      };
    }

    return node;
  });
};

const removeFromTree = (
  tree: CollectionNode[],
  targetId: string
): CollectionNode[] => {
  return tree
    .filter((item) => item.id !== targetId)
    .map((item) => {
      if (item.type === "folder") {
        return {
          ...item,
          children: removeFromTree(item.children, targetId),
        };
      }
      return item;
    });
};

const findParentId = (
  tree: CollectionNode[],
  targetId: string,
  parentId: string | null = null
): string | null => {
  for (const node of tree) {
    if (node.type === "request" && node.requestId === targetId) {
      return parentId;
    } else if (node.type === "folder") {
      const result = findParentId(node.children, targetId, node.id);
      if (result) return result;
    }
  }
  return null;
};
