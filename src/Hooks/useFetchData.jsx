import axios from "axios";
import { useQuery } from "react-query";

const useFetchData = (url) => {
  const fetchUsers = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, isLoading, isError, error } = useQuery("users", fetchUsers);
  return { data, isLoading, isError, error };
};

export default useFetchData;
