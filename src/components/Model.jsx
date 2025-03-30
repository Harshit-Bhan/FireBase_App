import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import React from "react";

const Model = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null; // Avoid rendering when closed

  return createPortal(
    <div
      className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur"
      onClick={onClose} // Clicking outside closes modal
    >
      <div
        className="relative z-50 m-auto min-h-[200px] min-w-[80%] bg-white p-4"
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal when clicking inside
      >
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={onClose}
            className="self-end text-2xl cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Model;
