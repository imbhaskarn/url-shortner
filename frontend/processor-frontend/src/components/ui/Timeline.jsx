import { Clock } from 'lucide-react';

const Timeline = ({ leadEvents }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Timeline</h3>
      <div className="relative border-l border-gray-200 pl-4">
        {leadEvents.map((event, index) => (
          <div key={index} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white"></div>
            <time className="mb-1 text-sm font-normal text-gray-400">
              {event.time}
            </time>
            <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
            <p className="text-base font-normal text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
