import React, { useState, useRef } from 'react';

export const AlertDialog = ({ triggerText, title, description, confirmText, cancelText, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const cancelRef = useRef(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        {triggerText}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg border border-gray-200">
            <div className="flex flex-col">
              <AlertDialogHeader title={title} />
              <AlertDialogDescription description={description} />
              <AlertDialogFooter>
                <AlertDialogCancel setOpen={setOpen} cancelText={cancelText} />
                <AlertDialogAction onConfirm={onConfirm} setOpen={setOpen} confirmText={confirmText} />
              </AlertDialogFooter>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const AlertDialogHeader = ({ title }) => (
  <div className="mb-4 border-b border-gray-200 pb-2">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);

export const AlertDialogTitle = ({ title }) => (
  <div className="mb-4 border-b border-gray-200 pb-2">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);

export const AlertDialogDescription = ({ description }) => (
  <div className="mb-6">
    <p className="text-gray-600">{description}</p>
  </div>
);
export const AlertDialogContent = ({ description }) => (
  <div className="mb-6">
    <p className="text-gray-600">{description}</p>
  </div>
);
export const AlertDialogFooter = ({ children }) => (
  <div className="flex justify-end gap-4 mt-4">
    {children}
  </div>
);
export const AlertDialogTrigger = ({ description }) => (
  <div className="mb-6">
    <p className="text-gray-600">{description}</p>
  </div>
);
export const AlertDialogCancel = ({ setOpen, cancelText }) => (
  <button
    ref={cancelRef}
    onClick={() => setOpen(false)}
    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
  >
    {cancelText || 'Cancel'}
  </button>
);

export const AlertDialogAction = ({ onConfirm, setOpen, confirmText }) => (
  <button
    onClick={() => {
      onConfirm();
      setOpen(false);
    }}
    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
  >
    {confirmText || 'Confirm'}
  </button>
);


