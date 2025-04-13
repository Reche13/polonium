import { CollectionNode } from "@/stores/CollectionStore";
import {
  CircleCheckBig,
  Folder as FolderClosed,
  FolderOpen,
} from "lucide-react";
import React, { useState } from "react";

interface Props {
  col: CollectionNode;
  selectedFolder: string | null;
  setSelectedFolder: (name: string) => void;
}

const SaveFolder = ({ col, selectedFolder, setSelectedFolder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFolderClick = () => {
    setIsOpen(!isOpen);
    setSelectedFolder(col.id);
  };

  if (col.type === "request") return null;
  return (
    <div className="w-full relative">
      {isOpen && (
        <div className="absolute w-0.5 bg-bg-light-sec dark:bg-bg-dark-sec top-8 bottom-0 left-[22px]" />
      )}
      <div className="flex items-center w-full">
        <div
          className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex items-center gap-4 py-2 px-4 flex-1 min-w-0"
          role="button"
          onClick={handleFolderClick}
        >
          <div className="flex items-center">
            {col.id === selectedFolder ? (
              <CircleCheckBig size={16} className="text-primary" />
            ) : isOpen ? (
              <FolderOpen size={16} />
            ) : (
              <FolderClosed size={16} />
            )}
          </div>
          <span className="text-xs truncate w-full select-none font-medium">
            {col.name}
          </span>
        </div>
      </div>
      {col.children && isOpen && (
        <div className="pl-4">
          {col.children.map((child) => (
            <SaveFolder
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              key={"request-save" + child.type + child.id}
              col={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveFolder;
