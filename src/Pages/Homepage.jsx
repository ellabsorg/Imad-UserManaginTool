import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import DialogPopUp from "../Components/DialogPopUp";
import { useUsersContext } from "../Components/UserContext";

function Homepage() {
  const { data, fetchUsers } = useUsersContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <DialogPopUp fetchUsers={fetchUsers} />
      <Cards data={data} />
    </div>
  );
}

export default Homepage;
