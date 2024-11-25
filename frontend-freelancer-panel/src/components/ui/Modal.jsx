import React from "react";
import Button from "./Button";

const Modal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-lg w-11/12 max-w-md">
        {/* Modal Header */}
        <div className="p-6 border-b rounded-t-3xl">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600">{message}</p>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end p-6 space-x-4 border-t rounded-b-3xl">
          {/* Cancel Button */}
          <Button
            content="Cancel"
            onClick={onClose}
            className="bg-gray-100 text-gray-600 hover:bg-gray-200"
          />
          {/* Confirm Button */}
          <Button content="Confirm" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
