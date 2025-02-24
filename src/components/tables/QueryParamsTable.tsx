import { useRequestTabStore } from "@/stores/RequestTabStore";
import React from "react";
import { DraggableTable, Row } from "./DraggableTable";
import { DragEndEvent } from "@dnd-kit/core";

const QueryParamsTable = () => {
  const { activeTabId, tabs, moveQueryParam, updateQueryParam } =
    useRequestTabStore();
  const activeTab = tabs.find((req) => req.id === activeTabId);
  const queryParams = activeTab?.queryParams || [];

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const fromIndex = queryParams.findIndex((r) => r.id === active.id);
    const toIndex = queryParams.findIndex((r) => r.id === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      moveQueryParam(activeTabId, fromIndex, toIndex);
    }
  };

  return (
    <DraggableTable handleDragEnd={handleDragEnd} rows={queryParams}>
      {queryParams.map((param) => (
        <Row key={param.id} id={param.id}>
          {param.key} - {param.value}
        </Row>
      ))}
    </DraggableTable>
  );
};

export default QueryParamsTable;
