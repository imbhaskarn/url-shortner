import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const TaskList = ({ leadId, tasks }) => {
  const [taskItems, setTaskItems] = useState(tasks);

  const toggleTaskStatus = (id) => {
    setTaskItems(
      taskItems.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Task List</h3>
      <ul className="space-y-4">
          <li
          
          >
            <span className="flex items-center">
             
                <Circle className="text-gray-400" size={20} />
              <span className="ml-3"></span>
            </span>
            <button
              className="text-sm text-blue-600 hover:underline"
            >
            </button>
          </li>
      </ul>
    </div>
  );
};

export default TaskList;
