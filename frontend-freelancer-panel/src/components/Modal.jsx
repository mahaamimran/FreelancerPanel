import React from "react";
import classNames from "classnames";

const Modal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end p-4 space-x-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
