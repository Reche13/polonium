"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { GripVertical } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  handleDragEnd: (e: DragEndEvent) => void;
  rows: { id: string; [key: string]: string }[];
  children: ReactNode;
}

export const DraggableTable = ({ handleDragEnd, rows, children }: Props) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={rows} strategy={verticalListSortingStrategy}>
        <div className="divide-y border">{children}</div>
      </SortableContext>
    </DndContext>
  );
};

interface RowProps {
  id: string;
  children: ReactNode;
}

export const Row = ({ id, children }: RowProps) => {
  const { listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      style={style}
      className="flex items-center bg-white"
    >
      {/* Drag Handle */}
      <div className="w-10 flex justify-center items-center px-2">
        <GripVertical size={16} className="cursor-grab" {...listeners} />
      </div>

      {children}
    </div>
  );
};
