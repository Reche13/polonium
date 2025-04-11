import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import { DraggableTable, Row } from "./DraggableTable";
import { DragEndEvent } from "@dnd-kit/core";
import { CircleCheckBig, Trash } from "lucide-react";
import { cn } from "@/lib/cn";
import Tooltip from "../primitives/Tooltip";

const QueryParamsTable = () => {
  const { activeTabId, tabs, moveQueryParam, editTab } = useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);
  const queryParams = activeTab?.queryParams || [];

  const ensureEmptyRow = (queryParams: any[]) => {
    const lastRow = queryParams[queryParams.length - 1];
    if (lastRow && lastRow.key.trim() !== "") {
      queryParams.push({
        id: crypto.randomUUID(),
        key: "",
        value: "",
        description: "",
        active: true,
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const fromIndex = queryParams.findIndex((r) => r.id === active.id);
    const toIndex = queryParams.findIndex((r) => r.id === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      moveQueryParam(activeTabId, fromIndex, toIndex);

      setTimeout(() => {
        const updatedQueryParams =
          useRequestTabStore
            .getState()
            .tabs.find((req) => req.id === activeTabId)?.queryParams || [];

        ensureEmptyRow(updatedQueryParams);
        editTab(activeTabId, { queryParams: updatedQueryParams });
      }, 0);
    }
  };

  const handleChange = (id: string, key: string, value: string) => {
    const updatedQueryParams = queryParams.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    ensureEmptyRow(updatedQueryParams);
    editTab(activeTabId, { queryParams: updatedQueryParams });
  };

  const changeActivity = (id: string) => {
    editTab(activeTabId, {
      queryParams: queryParams.map((param) =>
        param.id === id ? { ...param, active: !param.active } : param
      ),
    });
  };

  const deleteParam = (id: string) => {
    editTab(activeTabId, {
      queryParams: queryParams.filter((param) => param.id !== id),
    });
  };

  return (
    <DraggableTable handleDragEnd={handleDragEnd} rows={queryParams}>
      {queryParams.map((param) => (
        <Row key={param.id} id={param.id}>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Key"
              value={param.key}
              onChange={(e) => handleChange(param.id, "key", e.target.value)}
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                param.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Value"
              value={param.value}
              onChange={(e) => handleChange(param.id, "value", e.target.value)}
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                param.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Description"
              value={param.description}
              onChange={(e) =>
                handleChange(param.id, "description", e.target.value)
              }
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                param.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <Tooltip content="Turn off">
            <div
              role="button"
              className="p-2 cursor-pointer select-none"
              onClick={() => changeActivity(param.id)}
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
              <CircleCheckBig
                size={16}
                className={cn(
                  param.active ? "text-green-600" : "text-gray-500"
                )}
              />
            </div>
          </Tooltip>
          <Tooltip content="Remove">
            <div
              role="button"
              className="p-2 cursor-pointer"
              onClick={() => deleteParam(param.id)}
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
              <Trash size={16} className="text-red-600" />
            </div>
          </Tooltip>
        </Row>
      ))}
    </DraggableTable>
  );
};

export default QueryParamsTable;
