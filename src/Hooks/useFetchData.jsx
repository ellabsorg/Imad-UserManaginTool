import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsError(true);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, isLoading, isError, error, refetch: fetchUsers };
};

export default useFetchData;
