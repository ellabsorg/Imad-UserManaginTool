import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Input from "./Input";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUsersContext } from "./UserContext";

function EditUserPopup({ setIsEditOpen, isEditOpen }) {
  const { formik, setFormActionMode } = useUsersContext();
  useEffect(() => {
    setFormActionMode("edit");
  }, []);

  return (
    <div>
      <Dialog
        open={isEditOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsEditOpen(false)}
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
                  Edit User
                </DialogTitle>
                <div
                  onClick={() => setIsEditOpen(false)}
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
                  placeholder="Edit Name"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.name && formik.touched.name}
                  errorMessage={formik.errors.name}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"email"}
                  type={"email"}
                  value={formik.values.email}
                  placeholder="Edit Email"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.email && formik.touched.email}
                  errorMessage={formik.errors.email}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"age"}
                  type={"number"}
                  value={formik.values.age}
                  placeholder="Edit Age"
                  handleInputChange={formik.handleChange}
                  isError={formik.errors.age && formik.touched.age}
                  errorMessage={formik.errors.age}
                  onBlur={formik.handleBlur}
                />
                <Input
                  name={"role"}
                  type={"text"}
                  value={formik.values.role}
                  placeholder="Edit Role"
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
                    Save
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default EditUserPopup;
