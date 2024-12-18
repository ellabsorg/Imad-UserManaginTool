import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPen } from "@fortawesome/free-solid-svg-icons";

function Card({ user, handleDeleteClick, handleEditClick }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-[340px] h-[230px]">
      <div className="flex justify-end gap-5 cursor-pointer">
        <div className="cursor-pointer flex justify-end">
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#a80000" }}
            size="1x"
            onClick={() => handleDeleteClick(user)}
          />
        </div>
        <div className="cursor-pointer flex justify-end">
          <FontAwesomeIcon
            icon={faUserPen}
            style={{ color: "#a80000" }}
            size="1x"
            onClick={() => handleEditClick(user)}
          />
        </div>
      </div>
      <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
      <h2 className="text-gray-600">ID: {user.id}</h2>
      <h2 className="text-gray-600 ">Email: {user.email}</h2>
      <h2 className="text-gray-600">Age: {user.age}</h2>
      <h2
        className={`inline-block px-4 mt-5 py-2 text-white rounded-full text-sm font-semibold 
    ${user.role === "Admin" ? "bg-red-900" : ""}
    ${user.role === "Editor" ? "bg-green-700" : ""}
    ${user.role === "Viewer" ? "bg-blue-700" : ""}
  `}
      >
        {user.role}
      </h2>
    </div>
  );
}

export default Card;
