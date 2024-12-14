import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useFetchData = (url) => {
  const fetchUsers = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isLoading, isError, error, refetch } = useQuery(
    "users",
    fetchUsers
  );

  return { data, isLoading, isError, error, refetch: fetchUsers };
};

export default useFetchData;
