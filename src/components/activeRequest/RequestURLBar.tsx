import React, { ChangeEvent, useState } from "react";
import { Button } from "../primitives/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../primitives/Select";
import { Input } from "../primitives/Input";
import { methodColors, methods } from "@/constants/request";
import { useRequestTabStore } from "@/stores/RequestTabStore";
import useRequest from "@/hooks/useRequest";
import { toast } from "sonner";
import { useCollectionStore } from "@/stores/CollectionStore";
import Modal from "../modals/Modal";
import SaveFolder from "../saveRequest/SaveFolder";
import Tooltip from "../primitives/Tooltip";
import { Plus } from "lucide-react";

const RequestURLBar = () => {
  const { activeTabId, tabs, editTab } = useRequestTabStore();
  const activeRequest = tabs.find((req) => req.id === activeTabId);

  const { saveRequestFromTab, savedRequests, collections, addFolder } =
    useCollectionStore();

  const { generateRequest } = useRequest(activeTabId);

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [requestTitle, setRequestTitle] = useState(activeRequest?.title ?? "");

  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");

  const handleSend = () => {
    if (!activeRequest?.url.trim()) {
      toast.error("URL cannot be empty.");
      return;
    }
    generateRequest();
  };

  const handleMethodChange = (value: Method) => {
    editTab(activeTabId, {
      method: value,
    });
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    editTab(activeTabId, {
      url: e.target.value,
    });
  };

  const handleSave = () => {
    const alreadySaved: boolean = !!savedRequests[activeTabId];

    if (alreadySaved) {
      saveRequestFromTab(activeTabId);
      toast.success("Request saved!");
      return;
    } else {
      setSaveModalOpen(true);
      return;
    }
  };

  const handleCancelSave = () => {
    setSaveModalOpen(false);
  };

  const handleSaveToCollection = () => {
    if (!requestTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!selectedFolder?.trim()) {
      toast.error("Please select a location to save");
      return;
    }
    editTab(activeTabId, { title: requestTitle });
    saveRequestFromTab(activeTabId, selectedFolder);
    toast.success("Request saved!");
    setSaveModalOpen(false);
  };

  const handleTitleChange = () => {
    if (!newCollectionTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    addFolder(newCollectionTitle, null);
    setNewCollectionTitle("");
    setNewFolderModalOpen(false);
  };

  const handleTitleCancel = () => {
    setNewCollectionTitle("");
    setNewFolderModalOpen(false);
  };

  return (
    <div className="w-full flex gap-2 p-4">
      <div className="border border-stroke-light-ter dark:border-stroke-dark-ter rounded-lg flex items-center w-full  bg-bg-light-sec dark:bg-bg-dark-sec overflow-hidden">
        <Select
          value={activeRequest?.method}
          onValueChange={handleMethodChange}
        >
          <SelectTrigger className="w-[120px] px-4 py-2 border-y-0 border-l-0 rounded-none border-r border-stroke-light-ter dark:border-stroke-dark-ter  text-xs font-semibold flex gap-1 items-center">
            <SelectValue
              placeholder="Method"
              className=" text-text-b-pri dark:text-text-w-pri"
            />
          </SelectTrigger>
          <SelectContent className="bg-bg-light-pri dark:bg-bg-dark-pri border-0 h-full border-stroke-light-ter dark:border-stroke-dark-ter shadow-lg">
            {methods.map((method, index) => (
              <SelectItem
                style={{ color: methodColors[method] }}
                key={index}
                value={method}
                className="hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec text-xs font-medium"
              >
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* INPUT */}
        <Input
          type="text"
          value={activeRequest?.url}
          onChange={handleUrlChange}
          placeholder="Enter a URL"
          className="text-xs text-text-b-pri border-none rounded-l-none bg-transparent h-full dark:text-text-w-pri px-4 py-2  outline-none w-full"
        />
      </div>
      <Button onClick={handleSend}>Send</Button>
      <Button onClick={handleSave} variant="seconodary">
        Save
      </Button>

      <Modal
        title="Save to Collection"
        isOpen={saveModalOpen}
        onClose={handleCancelSave}
        primaryAction={handleSaveToCollection}
        primaryActionTitle="Save"
        secondaryAction={handleCancelSave}
        secondaryActionTitle="Cancel"
      >
        <Input
          type="text"
          value={requestTitle}
          onChange={(e) => setRequestTitle(e.target.value)}
          placeholder="Label"
          className="text-sm text-text-b-pri dark:text-text-w-pri px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec rounded-md border border-stroke-light-ter focus:border-stroke-light-sec dark:border-stroke-dark-ter dark:focus:border-stroke-dark-sec outline-none w-full"
        />

        <div className="text-xs font-medium text-text-b-sec dark:text-text-w-sec mt-6">
          Select location
        </div>
        <div className="border border-stroke-light-ter dark:border-stroke-dark-ter rounded-md mt-2">
          <div className="flex items-center border-b border-stroke-light-ter dark:border-stroke-dark-ter">
            <Tooltip content="Add new collection" delay={500}>
              <div
                role="button"
                onClick={() => setNewFolderModalOpen(true)}
                className="text-text-b-sec dark:text-text-w-sec hover:text-text-b-pri dark:hover:text-text-w-pri flex gap-2 px-4 py-2"
              >
                <Plus size={16} />
                <span className="text-xs font-medium">New</span>
              </div>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-1">
            {collections.length === 0 ? (
              <div className="text-center font-medium text-xs text-text-b-sec dark:text-text-w-sec py-6">
                No collections.
              </div>
            ) : (
              collections.map((col) => (
                <SaveFolder
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  col={col}
                  key={"request-save" + col.type + col.id}
                />
              ))
            )}
          </div>
        </div>
      </Modal>

      <Modal
        title="New Collection"
        isOpen={newFolderModalOpen}
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

export default RequestURLBar;
