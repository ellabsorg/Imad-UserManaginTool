import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import DeleteUserPopup from "./DeleteUserPopup";

function Card({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="cursor-pointer flex justify-end">
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "#ff0000" }}
          size="1x"
          onClick={handleDeleteClick}
        />
      </div>
      <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
      <h2 className="text-gray-600">User Number: {user.id}</h2>
      <h2 className="text-gray-600">Name: {user.email}</h2>
      <h2 className="text-gray-600">Age: {user.age}</h2>
      <h2
        className={`inline-block px-4 mt-5 py-2 text-white rounded-full text-sm font-semibold 
    ${user.role === "admin" ? "bg-red-900" : ""}
    ${user.role === "editor" ? "bg-green-700" : ""}
    ${user.role === "viewer" ? "bg-blue-700" : ""}
  `}
      >
        {user.role}
      </h2>
      {isOpen && (
        <DeleteUserPopup
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          userId={user.id}
        />
      )}
    </div>
  );
}

export default Card;
