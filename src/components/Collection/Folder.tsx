import { CollectionNode, useCollectionStore } from "@/stores/CollectionStore";
import {
  Copy,
  Edit,
  EllipsisVertical,
  File,
  FilePlus,
  Folder as FolderClose,
  FolderOpen,
  FolderPlus,
  Trash2,
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
import { methodColors } from "@/constants/request";
import { useRequestTabStore } from "@/stores/RequestTabStore";

const Folder = ({ col }: { col: CollectionNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [editNodeModalOpen, setEditNodeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [subFolderTitle, setSubFolderTitle] = useState("");
  const [requestTitle, setRequestTitle] = useState("");
  const [editNodeTitle, setEditNodeTitle] = useState(col.name);

  const {
    addFolder,
    addRequest,
    openRequestInTab,
    updateRequest,
    duplicateRequest,
    deleteNode,
    updateFolderName,
  } = useCollectionStore();
  const { editTab } = useRequestTabStore();

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

  const handleEditCancel = () => {
    setEditNodeModalOpen(false);
    setEditNodeTitle(col.name);
  };

  const handleEditRequest = () => {
    if (!editNodeTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    updateRequest(col.id, { title: editNodeTitle });
    editTab(col.id, { title: editNodeTitle });
    setEditNodeModalOpen(false);
  };

  const handleEditFolder = () => {
    updateFolderName(col.id, editNodeTitle);
    setEditNodeModalOpen(false);
  };

  const deleteReqOrFolder = () => {
    deleteNode(col.id);
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
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
          <div className="py-2 px-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <EllipsisVertical size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-bg-light-pri dark:bg-bg-dark-pri border-stroke-light-ter dark:border-stroke-dark-ter"
              >
                <DropdownMenuItem
                  role="button"
                  onClick={() => setEditNodeModalOpen(true)}
                  className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
                >
                  <Edit size={16} />
                  <span className="text-xs font-medium">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  role="button"
                  onClick={() => duplicateRequest(col.id)}
                  className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
                >
                  <Copy size={16} />
                  <span className="text-xs font-medium">Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  role="button"
                  onClick={() => setDeleteModalOpen(true)}
                  className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
                >
                  <Trash2 size={16} />
                  <span className="text-xs font-medium">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <EditModal
          col={col}
          EditFunction={handleEditRequest}
          editNodeModalOpen={editNodeModalOpen}
          editNodeTitle={editNodeTitle}
          setEditNodeTitle={setEditNodeTitle}
          handleCancel={handleEditCancel}
        />

        <DeleteModal
          col={col}
          deleteModalOpen={deleteModalOpen}
          deleteReqOrFolder={deleteReqOrFolder}
          handleCancelDelete={handleCancelDelete}
        />
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
              className="bg-bg-light-pri dark:bg-bg-dark-pri border-stroke-light-ter dark:border-stroke-dark-ter"
            >
              <DropdownMenuItem
                role="button"
                onClick={() => setRequestModalOpen(true)}
                className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <FilePlus size={16} />
                <span className="text-xs font-medium">New Request</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => setFolderModalOpen(true)}
                className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <FolderPlus size={16} />
                <span className="text-xs font-medium">New Folder</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => setEditNodeModalOpen(true)}
                className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <Edit size={16} />
                <span className="text-xs font-medium">Edit Folder</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => setDeleteModalOpen(true)}
                className="flex items-center gap-4 text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri px-4 py-2 rounded-sm hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec cursor-pointer"
              >
                <Trash2 size={16} />
                <span className="text-xs font-medium">Delete Folder</span>
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

      <EditModal
        col={col}
        EditFunction={handleEditFolder}
        editNodeModalOpen={editNodeModalOpen}
        editNodeTitle={editNodeTitle}
        setEditNodeTitle={setEditNodeTitle}
        handleCancel={handleEditCancel}
      />

      <DeleteModal
        col={col}
        deleteModalOpen={deleteModalOpen}
        deleteReqOrFolder={deleteReqOrFolder}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default Folder;

interface DeleteModalProps {
  col: CollectionNode;
  deleteModalOpen: boolean;
  deleteReqOrFolder: () => void;
  handleCancelDelete: () => void;
}

const DeleteModal = ({
  col,
  deleteModalOpen,
  deleteReqOrFolder,
  handleCancelDelete,
}: DeleteModalProps) => {
  return (
    <Modal
      title={`Delete ${col.type.charAt(0).toUpperCase() + col.type.slice(1)}`}
      isOpen={deleteModalOpen}
      onClose={handleCancelDelete}
      primaryAction={deleteReqOrFolder}
      primaryActionTitle="Delete"
      secondaryAction={handleCancelDelete}
      secondaryActionTitle="Cancel"
      primaryActionDestructive
    >
      <p className="text-sm text-text-b-sec dark:text-text-w-sec text-center">
        Are you sure you want to delete this {col.type}? <br />
        This action is irreversible
      </p>
    </Modal>
  );
};

interface EditModalProps {
  col: CollectionNode;
  editNodeModalOpen: boolean;
  EditFunction: () => void;
  handleCancel: () => void;
  editNodeTitle: string;
  setEditNodeTitle: (title: string) => void;
}

const EditModal = ({
  col,
  editNodeModalOpen,
  EditFunction,
  handleCancel,
  editNodeTitle,
  setEditNodeTitle,
}: EditModalProps) => {
  return (
    <Modal
      title={`Edit ${col.type.charAt(0).toUpperCase() + col.type.slice(1)}`}
      isOpen={editNodeModalOpen}
      onClose={handleCancel}
      primaryAction={EditFunction}
      primaryActionTitle="Save"
      secondaryAction={handleCancel}
      secondaryActionTitle="Cancel"
    >
      <Input
        type="text"
        value={editNodeTitle}
        onChange={(e) => setEditNodeTitle(e.target.value)}
        placeholder="Label"
        className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
      />
    </Modal>
  );
};
