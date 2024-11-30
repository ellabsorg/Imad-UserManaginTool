import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import DialogPopUp from "../Components/DialogPopUp";

function Homepage() {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setData([response.data]);
  };

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
