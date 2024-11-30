import React, { useEffect } from "react";
import Card from "./Card";
import { useUsersContext } from "./UserContext";
import AddUserPopup from "./AddUserPopup";

function Cards({ data }) {
  const { fetchUsers } = useUsersContext();
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
    </div>
  );
}

export default Cards;
