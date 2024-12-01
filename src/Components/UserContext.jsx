import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useId,
} from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { basicSchema } from "../schemas/basicSchema";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      role: "",
    },
    validationSchema: basicSchema,
    onSubmit: async () => {
      if (formActionMode === "edit") {
        await EditUser(userId);
      } else if (formActionMode === "add") {
        await AddUser();
      }
    },
  });
  const [userId, setUserId] = useState();
  const [formActionMode, setFormActionMode] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});

  const handleDeleteClick = (user) => {
    setIsDeleteOpen(true);
    setUserId(user.id);
  };
  const handleEditClick = (user) => {
    console.log("user");
    console.log(user);
    formik.setValues(user);
    setUserId(user.id);
    setIsEditOpen(true);
  };

  const url = "http://localhost:5000/users";
  // ===================== EDIT USER ======================
  async function EditUser(userId) {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        formik.values
      );
      setDataToEdit(response.data);
      if (response.status === 200) {
        toast.success("User Edited Successfully!");
        fetchUsers();
        setIsEditOpen(false);
      }
    } catch (error) {
      console.error("Error Editing users:", error);
      toast.error(`Error: ${error}.`);
    }
  }
  //====================== DELETE USER =========================
  const deleteUser = async (userId) => {
    const url = `http://localhost:5000/users/${userId}`;
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        fetchUsers();
        setIsDeleteOpen(false);
        toast.success("User deleted Successfully!");
      }
    } catch (error) {
      toast.error(`Error: ${error}.`);
    }
  };
  // ================ ADD USER =============================
  async function AddUser() {
    const response = await axios.get("http://localhost:5000/users");
    if (response.data.some((user) => user.email === formik.values.email)) {
      toast.error(`Email is already used`);
    } else {
      try {
        const response = await axios.post(url, formik.values);
        console.log(response.status);
        if (response.status === 201) {
          console.log(response.status);

          toast.success("User Added Successfully!");
          fetchUsers();
          setIsAddUserOpen(false);
        }
      } catch (error) {
        toast.error(`Error: ${error}.`);
      }
    }
  }
  //==========================================================

  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        data,
        fetchUsers,
        AddUser,
        formik,
        isAddUserOpen,
        setIsAddUserOpen,
        EditUser,
        setFormActionMode,
        isEditOpen,
        setIsEditOpen,
        userId,
        setUserId,
        deleteUser,
        isDeleteOpen,
        setIsDeleteOpen,
        handleDeleteClick,
        handleEditClick,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

// Custom Hook to use UsersContext
export const useUsersContext = () => useContext(UsersContext);
