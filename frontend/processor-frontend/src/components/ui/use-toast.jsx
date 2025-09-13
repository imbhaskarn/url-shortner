export const toast = ({ title , description}) => (
    <div className="mb-4 border-b border-gray-200 pb-2">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-xl font-semibold text-gray-800">{description}</p>
  
    </div>
  );
  