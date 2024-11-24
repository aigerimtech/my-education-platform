'use state';

import { useState } from "react";

type FilterModalProps={
    isOpen:boolean,
    onClose:()=>void,
    onSubmit: (filters: { price: string; rating: string; duration: string }) => void
}
const FilterModal = ({isOpen, onClose, onSubmit }:FilterModalProps) => {
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [duration, setDuration] = useState('');
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-black">Set Filters</h2>
          <input
            type="text"
            placeholder="Max Price"
            className="w-full mb-4 text-black p-2 border rounded placeholder:text-slate-600"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Min Rating"
            className="w-full mb-4 text-black p-2 border rounded placeholder:text-slate-600"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type="text"
            placeholder="Max Duration (e.g., 3h 30m)"
            className="w-full mb-4  text-black p-2 border rounded placeholder:text-slate-600"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => onSubmit({ price, rating, duration })}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );

  };

  export default FilterModal;