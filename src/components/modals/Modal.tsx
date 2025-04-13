import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "../primitives/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  primaryAction?: () => void;
  primaryActionTitle?: string;
  secondaryAction?: () => void;
  secondaryActionTitle?: string;
  primaryActionDestructive?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  primaryActionTitle,
  secondaryAction,
  secondaryActionTitle,
  primaryActionDestructive = false,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      {/* MODAL  */}
      <div className="bg-bg-light-pri dark:bg-bg-dark-pri rounded-lg shadow-lg w-[400px] max-w-full">
        {/* HEADER */}
        <div className="w-full p-4 flex justify-between items-center border-b border-stroke-light-ter dark:border-stroke-dark-ter">
          <span />
          <h2 className="text-lg font-semibold text-text-b-pri dark:text-text-w-pri">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-text-b-ter hover:text-text-b-sec dark:text-text-w-ter dark:hover:text-text-w-sec"
          >
            <X size={18} />
          </button>
        </div>
        {/* BODY */}
        <div className="w-full p-4 border-b border-stroke-light-ter dark:border-stroke-dark-ter">
          {children}
        </div>
        {/* FOOTER */}
        <div className="w-full p-4 flex items-center justify-end gap-2">
          {secondaryAction && (
            <Button variant="seconodary" onClick={secondaryAction}>
              {secondaryActionTitle}
            </Button>
          )}
          {primaryAction && (
            <Button
              variant={primaryActionDestructive ? "destructive" : "default"}
              onClick={primaryAction}
            >
              {primaryActionTitle}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
