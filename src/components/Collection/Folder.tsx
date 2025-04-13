import { CollectionNode, useCollectionStore } from "@/stores/CollectionStore";
import {
  EllipsisVertical,
  File,
  FilePlus,
  Folder as FolderClose,
  FolderOpen,
  FolderPlus,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "../primitives/Input";
import Modal from "../modals/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../primitives/Dropdown";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import { methodColors } from "@/constants/request";

const Folder = ({ col }: { col: CollectionNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [subFolderTitle, setSubFolderTitle] = useState("");
  const [requestTitle, setRequestTitle] = useState("");

  const { addFolder, addRequest, openRequestInTab } = useCollectionStore();

  const handleCreateSubFolder = () => {
    if (!subFolderTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    addFolder(subFolderTitle, col.id);
    setSubFolderTitle("");
    setFolderModalOpen(false);
  };

  const handleCancelSubFolder = () => {
    setFolderModalOpen(false);
    setSubFolderTitle("");
  };

  const handleCreateRequest = () => {
    if (!requestTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    addRequest(
      {
        title: requestTitle,
        method: "GET",
        url: "",
        bodyType: "none",
        requestState: "NOT_STARTED",
        selectedOptionNav: "PARAMS",
        SelectedResponseNav: "PRETTY",
      },
      col.id
    );

    setRequestTitle("");
    setRequestModalOpen(false);
  };

  const handleCancelRequest = () => {
    setRequestModalOpen(false);
    setRequestTitle("");
  };

  if (col.type === "request")
    return (
      <div className="w-full relative">
        <div className="flex items-center w-full">
          <div
            className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex items-center gap-4 py-2 px-4 flex-1 min-w-0"
            role="button"
            onClick={() => openRequestInTab(col.id)}
          >
            <div className="flex items-center gap-1">
              <File size={16} />
              <span
                style={{ color: methodColors[col.method] }}
                className="text-[10px] font-semibold select-none leading-3"
              >
                {col.method}
              </span>
            </div>
            <span className="text-xs truncate w-full select-none font-medium">
              {col.name}
            </span>
          </div>
        </div>
      </div>
    );

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
          <div className="flex items-center">
            {isOpen ? <FolderOpen size={16} /> : <FolderClose size={16} />}
          </div>
          <span className="text-xs truncate w-full select-none font-medium">
            {col.name}
          </span>
        </div>
        <div className="py-2 px-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <EllipsisVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-bg-light-pri dark:bg-bg-dark-pri border-stroke-light-sec dark:border-stroke-dark-sec"
            >
              <DropdownMenuItem
                role="button"
                onClick={() => setRequestModalOpen(true)}
                className="flex items-center gap-2 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <FilePlus size={16} />
                <span className="text-xs font-medium">New Request</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => setFolderModalOpen(true)}
                className="flex items-center gap-2 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <FolderPlus size={16} />
                <span className="text-xs font-medium">New Folder</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {col.children && isOpen && (
        <div className="pl-4">
          {col.children.map((child) => (
            <Folder key={child.type + child.id} col={child} />
          ))}
        </div>
      )}

      <Modal
        title="New Folder"
        isOpen={folderModalOpen}
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

      <Modal
        title="New Request"
        isOpen={requestModalOpen}
        onClose={handleCancelRequest}
        primaryAction={handleCreateRequest}
        primaryActionTitle="Save"
        secondaryAction={handleCancelRequest}
        secondaryActionTitle="Cancel"
      >
        <Input
          type="text"
          value={requestTitle}
          onChange={(e) => setRequestTitle(e.target.value)}
          placeholder="Label"
          className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
        />
      </Modal>
    </div>
  );
};

export default Folder;
