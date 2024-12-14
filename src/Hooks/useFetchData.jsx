import axios from "axios";
import { useMutation, useQuery } from "react-query";

const useFetchData = (url) => {
  const fetchUsers = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isLoading, isError, error, refetch } = useQuery(
    "users",
    fetchUsers
  );

  return { data, isLoading, isError, error, refetch };
};

export default useFetchData;
