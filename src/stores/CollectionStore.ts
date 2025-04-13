import { create } from "zustand";
import { RequestTab, useRequestTabStore } from "./RequestTabStore";

interface CollectionStore {
  savedRequests: Record<string, SavedRequest>;
  collections: CollectionNode[];

  addFolder: (name: string, parentId: string | null) => void;
  addRequest: (req: Omit<SavedRequest, "id">, parentId: string | null) => void;
  updateRequest: (id: string, updates: Partial<SavedRequest>) => void;
  deleteNode: (id: string) => void;
  openRequestInTab: (requestId: string) => void;
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

  updateRequest: (id, updates) => {
    set((state) => {
      const updatedSavedRequest = {
        ...state.savedRequests[id],
        ...updates,
      };

      const newCollections = updates.title
        ? updateNodeInTree(state.collections, id, updates.title)
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
      selectedOptionNav: "BODY",
      SelectedResponseNav: "PRETTY",
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

function updateNodeInTree(
  tree: CollectionNode[],
  requestId: string,
  updatedName: string
): CollectionNode[] {
  return tree.map((node) => {
    if (node.type === "folder") {
      return {
        ...node,
        children: updateNodeInTree(node.children, requestId, updatedName),
      };
    } else if (node.type === "request" && node.requestId === requestId) {
      return {
        ...node,
        name: updatedName,
      };
    }
    return node;
  });
}

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
