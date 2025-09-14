import type { ChangeEvent } from "react";
import { useState, useCallback } from "react";

export const SearchBar = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className="container bg-white mx-auto px-4 py-4">
      <div className="relative flex items-center border-b border-gray-300 pb-3">
        <svg
          className="w-5 h-5 text-gray-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search characters..."
          className="w-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
        />
      </div>
    </div>
  );
};
