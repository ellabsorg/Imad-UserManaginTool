import React from "react";

function SelectComponent({
  name,
  value,
  handleInputChange,
  isError,
  errorMessage,
  onBlur,
}) {
  return (
    <div className="flex items-center justify-center">
      <label htmlFor={name} className="first-letter:uppercase font-bold">
        {name}:
      </label>

      <div className="flex flex-col items-start justify-center">
        <select
          name={name}
          onChange={handleInputChange}
          onBlur={onBlur}
          value={value}
          className="w-56 p-2 border-b-2 ml-4 mt-2 border-[#ed721b] outline-none focus:outline-none focus:ring-0 bg-transparent"
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        {isError && <div className="text-red-800 ml-4">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default SelectComponent;
