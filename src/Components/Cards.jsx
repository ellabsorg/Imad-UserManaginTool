import React, { useEffect } from "react";
import Card from "./Card";
import { useUsersContext } from "./UserContext";
import AddUserPopup from "./AddUserPopup";
import EditUserPopup from "./EditUserPopup";
import DeleteUserPopup from "./DeleteUserPopup";

function Cards() {
  const {
    fetchUsers,
    data,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
  } = useUsersContext();
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <AddUserPopup fetchUsers={fetchUsers} />
      <div className="flex flex-wrap items-start justify-start gap-4">
        {data?.map((item, index) => (
          <Card key={index} user={item} />
        ))}
      </div>
      {isDeleteOpen && (
        <DeleteUserPopup
          setIsDeleteOpen={setIsDeleteOpen}
          isDeleteOpen={isDeleteOpen}
          formActionMode={"delete"}
        />
      )}
      {isEditOpen && (
        <EditUserPopup
          setIsEditOpen={setIsEditOpen}
          isEditOpen={isEditOpen}
          formActionMode={"edit"}
        />
      )}
    </div>
  );
}

export default Cards;
