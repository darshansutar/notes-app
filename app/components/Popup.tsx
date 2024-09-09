import React, { useEffect } from 'react';

interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type: 'success' | 'delete';
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose, onConfirm, type }) => {
  useEffect(() => {
    if (isVisible && type === 'success') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Close after 3 seconds for success messages

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, type]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-6 py-3 rounded-md shadow-lg z-50">
      <p className="mb-2">{message}</p>
      {type === 'delete' && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;