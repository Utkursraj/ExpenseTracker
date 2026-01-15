import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">
        {content}
      </p>
      
      <div className="flex justify-end mt-6">
        <button 
          type="button"
          
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;