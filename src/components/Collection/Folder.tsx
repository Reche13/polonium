import { CollectionNode, useCollectionStore } from "@/stores/CollectionStore";
import {
  EllipsisVertical,
  Folder as FolderClose,
  FolderOpen,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../primitives/Input";
import Modal from "../modals/Modal";

const Folder = ({ col }: { col: CollectionNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [subFolderTitle, setSubFolderTitle] = useState("");

  const { addFolder } = useCollectionStore();

  const handleCreateSubFolder = () => {
    if (!subFolderTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    addFolder(subFolderTitle, col.id);
    setSubFolderTitle("");
    setModalOpen(false);
  };

  const handleCancelSubFolder = () => {
    setModalOpen(false);
    setSubFolderTitle("");
  };

  if (col.type === "request") return <div className="">File</div>;

  return (
    <div className="w-full relative">
      {isOpen && (
        <div className="absolute w-0.5 bg-bg-light-sec dark:bg-bg-dark-sec top-8 bottom-0 left-[22px]" />
      )}
      <div className="flex items-center w-full">
        <div
          className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex items-center gap-4 py-2 px-4 flex-1 min-w-0"
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FolderOpen size={16} /> : <FolderClose size={16} />}
          <span className="text-xs truncate w-full">{col.name}</span>
        </div>
        <div
          role="button"
          onClick={() => setModalOpen(true)}
          className="py-2 px-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri"
        >
          <EllipsisVertical size={16} />
        </div>
      </div>
      {col.children && isOpen && (
        <div className="pl-4">
          {col.children.map((child) => (
            <Folder col={child} />
          ))}
        </div>
      )}
      <Modal
        title="New Folder"
        isOpen={modalOpen}
        onClose={handleCancelSubFolder}
        primaryAction={handleCreateSubFolder}
        primaryActionTitle="Save"
        secondaryAction={handleCancelSubFolder}
        secondaryActionTitle="Cancel"
      >
        <Input
          type="text"
          value={subFolderTitle}
          onChange={(e) => setSubFolderTitle(e.target.value)}
          placeholder="Label"
          className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
        />
      </Modal>
    </div>
  );
};

export default Folder;
