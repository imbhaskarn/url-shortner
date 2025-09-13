import React from 'react';
import { Dialog } from '@headlessui/react'; // You can use any modal library you prefer
import { Button } from './Button';

const ScheduleFollowUpModal = ({ isOpen, onClose, onSchedule }) => {
    const [followUpDate, setFollowUpDate] = React.useState('');
  
    const handleSubmit = () => {
      onSchedule(followUpDate);
      setFollowUpDate('');
      onClose();
    };
  
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded max-w-md w-full p-6">
            <Dialog.Title>Schedule Follow-Up</Dialog.Title>
            <input
              type="datetime-local"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSubmit}>Schedule</Button>
              <Button onClick={onClose} variant="outline" className="ml-2">Cancel</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };
  

  export default ScheduleFollowUpModal;