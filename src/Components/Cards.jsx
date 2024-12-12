import React, { useState } from "react";
import Card from "./Card";
import AddUserPopup from "./AddUserPopup";
import EditUserPopup from "./EditUserPopup";
import DeleteUserPopup from "./DeleteUserPopup";
import { Button } from "@headlessui/react";
import axios from "axios";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/basicSchema";
import toast from "react-hot-toast";
import useFetchData from "../Hooks/useFetchData";

function Cards() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [formActionMode, setFormActionMode] = useState("");
  // ===================== EDIT USER ======================
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [deleteUserId, setDeleteUserId] = useState(null);

  const { data, isLoading, isError, error, refetch } = useFetchData(
    "http://localhost:5000/users"
  );

  const initialValues = { name: "", email: "", age: "", role: "Admin" };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: basicSchema,
    onSubmit: async () => {
      if (userId) {
        await EditUser(userId);
      } else {
        await AddUser();
      }
    },
  });

  // ================ ADD USER =============================
  async function AddUser() {
    const response = await axios.get("http://localhost:5000/users");
    if (response.data.some((user) => user.email === formik.values.email)) {
      toast.error(`Email is already used`);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/users",
          formik.values
        );
        if (response.status === 201) {
          toast.success("User Added Successfully!");
          refetch();
          setIsAddUserOpen(false);
        }
      } catch (error) {
        toast.error(`Error: ${error}.`);
      }
    }
  }
  const handleEditClick = (user) => {
    formik.setValues(user);
    setUserId(user.id);
  };

  async function EditUser(userId) {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        formik.values
      );
      setDataToEdit(response.data);
      if (response.status === 200) {
        toast.success("User Edited Successfully!");
        refetch();
        setUserId(null);
      }
    } catch (error) {
      console.error("Error Editing users:", error);
      toast.error(`Error: ${error}.`);
    }
  }
  const handleDeleteClick = (user) => {
    setDeleteUserId(user.id);
  };

  const onAddUserPopupClose = () => {
    setIsAddUserOpen(false);
    setUserId(null);
  };

  const onEditUserPopupClose = () => {
    setUserId(null);
  };

  const onUserDelete = async (userId) => {
    const url = `http://localhost:5000/users/${deleteUserId}`;
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        refetch();
        setDeleteUserId(null);
        toast.success("User deleted Successfully!");
      }
    } catch (error) {
      toast.error(`Error: ${error}.`);
    }
  };

  const onDeleteUserPopupClose = () => {
    setDeleteUserId(null);
  };

  return (
    <div>
      <Button
        onClick={() => setIsAddUserOpen(true)}
        className="rounded-md bg-gray-100 py-4 px-8 m-5 text-xl font-medium text-gray-900 focus:outline-none hover:bg-gray-200 focus:ring focus:ring-gray-300"
      >
        Add a new user
      </Button>

      {isLoading ? (
        <h1 className="text-red-500">LOADING..</h1>
      ) : (
        <div className="flex flex-wrap gap-4">
          {data?.map((item, index) => (
            <Card
              key={index}
              user={item}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
            />
          ))}
        </div>
      )}

      {deleteUserId && (
        <DeleteUserPopup
          onClose={onDeleteUserPopupClose}
          isDeleteOpen={Boolean(deleteUserId)}
          onDelete={onUserDelete}
        />
      )}

      <AddUserPopup
        AddUser={AddUser}
        fetchUsers={refetch}
        isOpen={isAddUserOpen}
        onClose={onAddUserPopupClose}
        formik={formik}
      />

      {userId && (
        <EditUserPopup
          setUserId={setUserId}
          setIsEditOpen={setIsEditOpen}
          isEditOpen={Boolean(userId)}
          formActionMode={"edit"}
          handleEditClick={handleEditClick}
          formik={formik}
          onClose={onEditUserPopupClose}
        />
      )}
    </div>
  );
}

export default Cards;
