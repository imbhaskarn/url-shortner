import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./dialog";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";
import { Calendar as CalendarIcon, Clock, Paperclip } from 'lucide-react';
import { Calendar } from "./calender";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { format } from 'date-fns';
import { LeadTask } from '../../services/api';
const Textarea = ({ value,onInput, placeholder, rows = 4, className = '' }) => {
    return (
      <textarea
        value={value}
        onInput={onInput}
        placeholder={placeholder}
        rows={rows}
        className={`border rounded-md p-2 ${className}`}
      />
    );
  };
  
  export function TaskModal({ leadId, onClose, onSave }) {
    const [task, setTask] = useState({
      title: '',
      dueDate: new Date(),
      priority: 'medium',
      description: '',
      assignee: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await createTask({ ...task, leadId });

        onSave(response);

      } catch (error) {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.'); // Notify user
      }
    };
  
    return (
      <Dialog open={true} onClose={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Title</label>
            <Input
              value={task.title}
              onInput={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" class="w-full justify-start text-left font-normal">
                  <CalendarIcon class="mr-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={task.dueDate}
                  onSelect={(date) => setTask({ ...task, dueDate: date })}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Priority</label>
            <Select 
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <Textarea
              value={task.description}
              onInput={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
            />
          </div>            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
// Task Modal Component


// Activity Modal Component

export function NoteModal({ leadId, onClose, onSave }) {
  const [note, setNote] = useState({
    content: '',
    category: 'general'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNote({ ...note, leadId });
      onSave(response);
    } catch (error) {
      console.error('Error creating note:', error);
      // You can also set an error state here to show feedback to the user
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={note.category}
              onChange={(e) => setNote((prev) => ({ ...prev, category: e.target.value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="meeting">Meeting Notes</SelectItem>
                <SelectItem value="follow_up">Follow-up</SelectItem>
                <SelectItem value="important">Important</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={note.content}
              onChange={(e) => setNote((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Enter note content"
              rows={5}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}




export function FileModal({ leadId, onClose, onSave }) {
  const [file, setFile] = useState({
    file: null,
    title: '',
    category: 'document',
    description: ''
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile((prev) => ({ ...prev, file: selectedFile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('title', file.title);
      formData.append('category', file.category);
      formData.append('description', file.description);
      formData.append('leadId', leadId);

      const response = await uploadFile(formData);
      onSave(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      // You can also set an error state here to show feedback to the user
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">File</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Paperclip className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {file.file ? file.file.name : "Click to upload or drag and drop"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={file.title}
              onChange={(e) => setFile((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="File Title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={file.category}
              onChange={(e) => setFile((prev) => ({ ...prev, category: e.target.value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={file.description}
              onChange={(e) => setFile((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter file description"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Upload File</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export function ActivityModal({ leadId, type, onClose, onSave }) {
  const [activity, setActivity] = useState({
    type,
    date: new Date(),
    duration: '',
    notes: '',
    outcome: ''
  });
const id = 32;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LeadTask({ ...activity, id });
      onSave(response);
    } catch (error) {
      console.error('Error creating activity:', error);
      // You can also set an error state here to show feedback to the user
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Log ${type} Activity`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date & Time</label>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(activity.date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={activity.date}
                  onSelect={(date) => setActivity((prev) => ({ ...prev, date }))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                value={activity.duration}
                onChange={(e) => setActivity((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="Duration"
                className="w-24"
              />
              <span>minutes</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Outcome</label>
            <Select
              value={activity.outcome}
              onChange={(e) => setActivity((prev) => ({ ...prev, outcome: e.target.value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="no_answer">No Answer</SelectItem>
                <SelectItem value="rescheduled">Rescheduled</SelectItem>
                <SelectItem value="follow_up">Need Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={activity.notes}
              onChange={(e) => setActivity((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Enter activity notes"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Log Activity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
