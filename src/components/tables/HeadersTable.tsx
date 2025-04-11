import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import { DraggableTable, Row } from "./DraggableTable";
import { DragEndEvent } from "@dnd-kit/core";
import { CircleCheckBig, Trash } from "lucide-react";
import { cn } from "@/lib/cn";
import Tooltip from "../primitives/Tooltip";

const HeadersTable = () => {
  const { activeTabId, tabs, moveHeader, editTab } = useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);
  const headers = activeTab?.headers || [];

  const ensureEmptyRow = (headers: any[]) => {
    const lastRow = headers[headers.length - 1];
    if (lastRow && lastRow.key.trim() !== "") {
      headers.push({
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
    const fromIndex = headers.findIndex((r) => r.id === active.id);
    const toIndex = headers.findIndex((r) => r.id === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      moveHeader(activeTabId, fromIndex, toIndex);

      setTimeout(() => {
        const updatedHeaders =
          useRequestTabStore
            .getState()
            .tabs.find((req) => req.id === activeTabId)?.headers || [];

        ensureEmptyRow(updatedHeaders);
        editTab(activeTabId, { headers: updatedHeaders });
      }, 0);
    }
  };

  const handleChange = (id: string, key: string, value: string) => {
    const updatedHeaders = headers.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    ensureEmptyRow(updatedHeaders);
    editTab(activeTabId, { headers: updatedHeaders });
  };

  const changeActivity = (id: string) => {
    editTab(activeTabId, {
      headers: headers.map((header) =>
        header.id === id ? { ...header, active: !header.active } : header
      ),
    });
  };

  const deleteHeader = (id: string) => {
    editTab(activeTabId, {
      headers: headers.filter((header) => header.id !== id),
    });
  };

  return (
    <DraggableTable handleDragEnd={handleDragEnd} rows={headers}>
      {headers.map((header) => (
        <Row key={header.id} id={header.id}>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Key"
              value={header.key}
              onChange={(e) => handleChange(header.id, "key", e.target.value)}
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                header.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Value"
              value={header.value}
              onChange={(e) => handleChange(header.id, "value", e.target.value)}
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                header.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <div className="p-2 flex flex-1">
            <input
              type="text"
              placeholder="Description"
              value={header.description}
              onChange={(e) =>
                handleChange(header.id, "description", e.target.value)
              }
              onPointerDownCapture={(e) => e.stopPropagation()}
              spellCheck={false}
              className={cn(
                "bg-transparent text-xs font-medium outline-none w-full",
                header.active
                  ? "text-text-b-pri dark:text-text-w-pri"
                  : "text-text-b-ter dark:text-text-w-ter"
              )}
            />
          </div>
          <Tooltip content="Turn off" delay={500}>
            <div
              role="button"
              className="p-2 cursor-pointer select-none"
              onClick={() => changeActivity(header.id)}
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
              <CircleCheckBig
                size={16}
                className={cn(
                  header.active ? "text-green-600" : "text-gray-500"
                )}
              />
            </div>
          </Tooltip>
          <Tooltip content="Remove" delay={500}>
            <div
              role="button"
              className="p-2 cursor-pointer"
              onClick={() => deleteHeader(header.id)}
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

export default HeadersTable;
