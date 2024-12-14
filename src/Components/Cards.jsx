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
import { useMutation, useQueryClient } from "react-query";

function Cards() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userId, setUserId] = useState();
  // ===================== EDIT USER ======================
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [deleteUserId, setDeleteUserId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useFetchData(
    "http://localhost:5000/users"
  );

  const initialValues = { name: "", email: "", age: "", role: "Admin" };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: basicSchema,
    onSubmit: async () => {
      if (userId) {
        await EditUserMutation.mutate(userId);
      } else {
        addUserMutation.mutate(formik.values);
      }
    },
  });

  // ================ ADD USER Mutation =============================
  const addUserMutation = useMutation(
    async (newUser) => {
      const existingUsers = await axios.get("http://localhost:5000/users");
      if (existingUsers.data.some((user) => user.email === newUser.email)) {
        toast.error(`Email is already used`);
      } else {
        const response = await axios.post(
          "http://localhost:5000/users",
          newUser
        );
        return response.data;
      }
    },
    {
      onSuccess: () => {
        toast.success("User Added Successfully!");
        queryClient.invalidateQueries(["users"]);
        setIsAddUserOpen(false);
      },
      onError: (error) => {
        toast.error(`Error: ${error}`);
      },
    }
  );

  // ================ Edit USER Mutation =======================
  const EditUserMutation = useMutation(
    async (userId) => {
      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        formik.values
      );
      setDataToEdit(response.data);
    },
    {
      onSuccess: () => {
        toast.success("User Edited Successfully!");
        queryClient.invalidateQueries(["users"]);
        setUserId(null);
      },
      onError: (error) => {
        toast.error(`Error: ${error}`);
      },
    }
  );
  // ================ Delete USER Mutation =======================
  const deleteUserMutation = useMutation(
    async (userId) => {
      const url = `http://localhost:5000/users/${deleteUserId}`;
      const response = await axios.delete(url);
    },
    {
      onSuccess: () => {
        setDeleteUserId(null);
        toast.success("User Deleted Successfully!");
        queryClient.invalidateQueries(["users"]);
        setUserId(null);
      },
      onError: (error) => {
        toast.error(`Error: ${error}`);
      },
    }
  );
  //============================================================

  const handleEditClick = (user) => {
    formik.setValues(user);
    setUserId(user.id);
  };
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
          onDelete={deleteUserMutation.mutate}
        />
      )}

      <AddUserPopup
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
