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
  rows: {
    id: string;
    key: string;
    value: string;
    description?: string;
    active: boolean;
  }[];
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
      className="flex items-center divide-x bg-bg-light-pri dark:bg-bg-dark-pri group"
    >
      {/* Drag Handle */}
      <div
        className="flex justify-center items-center p-2 cursor-grab"
        {...listeners}
      >
        <GripVertical
          size={16}
          className="transition-opacity opacity-0 group-hover:opacity-100 text-text-b-sec dark:text-text-w-sec"
        />
      </div>

      {children}
    </div>
  );
};
