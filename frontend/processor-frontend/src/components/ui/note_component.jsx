import React from 'react';
import { Dialog } from '@headlessui/react'; // You can use any modal library you prefer
import { Button } from './Button';

const AddNoteModal = ({ isOpen, onClose, onAddNote }) => {
  const [note, setNote] = React.useState('');

  const handleSubmit = () => {
    onAddNote(note);
    setNote('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded max-w-md w-full p-6">
          <Dialog.Title>Add a Note</Dialog.Title>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your note here..."
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmit}>Add Note</Button>
            <Button onClick={onClose} variant="outline" className="ml-2">Cancel</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};


export default AddNoteModal;