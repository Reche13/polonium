import { cn } from "@/lib/cn";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import { Dot, X } from "lucide-react";
import Modal from "../modals/Modal";
import { useState } from "react";
import { methodColors } from "@/constants/request";
import { Input } from "../primitives/Input";

interface Props {
  id: string;
  title?: string;
  method?: Method;
}

const ActiveRequestTab = ({
  id,
  title = "Untitled",
  method = "GET",
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewtitle] = useState(title);
  const { activeTabId, removeTab, setActiveTab, tabs, editTab } =
    useRequestTabStore();

  const active = id === activeTabId;

  const handleRemove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeTab(id);
  };

  const onlyOneLeft = tabs.length === 1;

  const handleTitleChange = () => {
    if (!newTitle.trim()) return;
    // TODO: implement toast here
    editTab(id, { title: newTitle });
    setModalOpen(false);
  };

  const handleTitleCancel = () => {
    setNewtitle(title);
    setModalOpen(false);
  };

  const color = methodColors[method];

  return (
    <div
      onClick={() => setActiveTab(id)}
      className={cn(
        "relative cursor-pointer py-4 px-3 w-[180px] flex items-center justify-between gap-2 group bg-bg-light-sec dark:bg-bg-dark-sec ",
        active
          ? "bg-bg-light-pri dark:bg-bg-dark-pri"
          : "hover:bg-bg-light-ter dark:hover:bg-bg-dark-ter"
      )}
    >
      {active && (
        <div className="absolute top-0 left-0 right-0 w-full h-[2px] bg-primary" />
      )}
      <div className="flex items-center gap-3 w-[80%]">
        <span style={{ color }} className="text-[10px] font-semibold">
          {method}
        </span>
        <p
          onDoubleClick={() => setModalOpen(true)}
          className={cn(
            "text-xs font-medium truncate select-none",
            active
              ? "text-text-b-pri dark:text-text-w-pri"
              : "text-text-b-sec dark:text-text-w-sec"
          )}
        >
          {title}
        </p>
      </div>
      <div
        className="shrink-0 cursor-pointer relative w-4 h-4 group/button"
        role="button"
        onClick={handleRemove}
      >
        {!onlyOneLeft && (
          <X className="size-4 text-text-b-sec/80 dark:text-text-w-sec/80 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover/button:text-text-b-sec dark:group-hover/button:text-text-w-sec transition-opacity duration-200" />
        )}
        <Dot className="size-4 text-text-b-ter dark:text-text-w-sec absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-200" />
      </div>
      <Modal
        title="Edit Request"
        isOpen={modalOpen}
        onClose={handleTitleCancel}
        primaryAction={handleTitleChange}
        primaryActionTitle="Save"
        secondaryAction={handleTitleCancel}
        secondaryActionTitle="Cancel"
      >
        <Input
          type="text"
          value={newTitle}
          onChange={(e) => setNewtitle(e.target.value)}
          placeholder="Label"
          className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
        />
      </Modal>
    </div>
  );
};

export default ActiveRequestTab;
