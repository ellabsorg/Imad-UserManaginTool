import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    console.log("GOING TO FETCH");
    try {
      const response = await axios.get("http://localhost:5000/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <UsersContext.Provider value={{ data, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// Custom Hook to use UsersContext
export const useUsersContext = () => useContext(UsersContext);
