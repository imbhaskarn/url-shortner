import React from 'react';
import { Dialog } from '@headlessui/react'; // You can use any modal library you prefer
import { Button } from './Button';

export const SendEmailModal = ({ isOpen, onClose, onSend }) => {
    const [emailContent, setEmailContent] = React.useState('');
  
    const handleSubmit = () => {
      onSend(emailContent);
      setEmailContent('');
      onClose();
    };
  
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6">
            <Dialog.Title>Send Email</Dialog.Title>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Type your email content here..."
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSubmit}>Send Email</Button>
              <Button onClick={onClose} variant="outline" className="ml-2">Cancel</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };

  export default SendEmailModal;
  