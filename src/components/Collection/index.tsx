import React, { useState } from "react";
import Tooltip from "../primitives/Tooltip";
import { Plus } from "lucide-react";
import Modal from "../modals/Modal";
import { Input } from "../primitives/Input";
import { toast } from "sonner";
import { useCollectionStore } from "@/stores/CollectionStore";
import Folder from "./Folder";

const Collection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");

  const { addFolder, collections } = useCollectionStore();

  const handleTitleChange = () => {
    if (!newCollectionTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    addFolder(newCollectionTitle, null);
    setNewCollectionTitle("");
    setModalOpen(false);
  };

  const handleTitleCancel = () => {
    setNewCollectionTitle("");
    setModalOpen(false);
  };

  return (
    <div className="bg-bg-light-pri dark:bg-bg-dark-pri h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center border-b border-stroke-light-ter dark:border-stroke-dark-ter">
        <Tooltip content="Add new collection" delay={500}>
          <div
            role="button"
            onClick={() => setModalOpen(true)}
            className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex gap-2 px-4 py-2"
          >
            <Plus size={16} />
            <span className="text-xs font-medium">New</span>
          </div>
        </Tooltip>
      </div>

      <div className="flex-1 flex flex-col gap-1 py-1">
        {collections.map((col) => (
          <Folder col={col} key={col.id} />
        ))}
      </div>

      <Modal
        title="New Collection"
        isOpen={modalOpen}
        onClose={handleTitleCancel}
        primaryAction={handleTitleChange}
        primaryActionTitle="Save"
        secondaryAction={handleTitleCancel}
        secondaryActionTitle="Cancel"
      >
        <Input
          type="text"
          value={newCollectionTitle}
          onChange={(e) => setNewCollectionTitle(e.target.value)}
          placeholder="Label"
          className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
        />
      </Modal>
    </div>
  );
};

export default Collection;
