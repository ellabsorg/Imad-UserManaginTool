import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import Input from "./Input";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/basicSchema";
import { useUsersContext } from "./UserContext";

export default function DialogPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const { fetchUsers } = useUsersContext();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      role: "",
    },
    validationSchema: basicSchema,
    onSubmit: AddUser,
  });

  const url = "http://localhost:5000/users";

  async function AddUser() {
    try {
      const response = await axios.post(url, formik.values);
      console.log(response.status);
      if (response.status === 201) {
        console.log(response.status);

        toast.success("User Added Successfully!");
        fetchUsers();
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(`Error: ${error}.`);
    }
  }
  console.log(formik.touched);
  //================================ RETURN ===================================
  return (
    <>
      <Toaster />
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-gray-100 py-4 px-8 m-5 text-xl font-medium text-gray-900 focus:outline-none hover:bg-gray-200 focus:ring focus:ring-gray-300"
      >
        Add a new user
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={AddUser}
        __demoMode
      >
        {/* ====================POPUP ================================= */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            >
              <div class="flex justify-between items-start">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-700"
                >
                  Add New User
                </DialogTitle>
                <div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: "#ff0000" }}
                    size="2x"
                  />
                </div>
              </div>
              {/* =================== INPUTS ====================== */}
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col mt-8"
              >
                <Input
                  name={"name"}
                  type={"text"}
                  value={formik.values.name}
                  placeholder="Enter Name"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.name && formik.touched.name}
                  errorMessage={formik.errors.name}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"email"}
                  type={"email"}
                  value={formik.values.email}
                  placeholder="Enter Email"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.email && formik.touched.email}
                  errorMessage={formik.errors.email}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"age"}
                  type={"number"}
                  value={formik.values.age}
                  placeholder="Enter Age"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.age && formik.touched.age}
                  errorMessage={formik.errors.age}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"role"}
                  type={"text"}
                  value={formik.values.role}
                  placeholder="Enter Role"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.role && formik.touched.role}
                  errorMessage={formik.errors.role}
                  onBlur={formik.handleBlur}
                />
                <div className="mt-6 flex justify-end">
                  <Button
                    className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
                    type="submit"
                  >
                    Add User
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
