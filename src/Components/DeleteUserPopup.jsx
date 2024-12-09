import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useUsersContext } from "./UserContext";

export default function DeleteUserPopup() {
  const { fetchUsers, deleteUser, isDeleteOpen, setIsDeleteOpen, userId } =
    useUsersContext();
  console.log("WINDOW OPENED");

  return (
    <>
      <Toaster />
      <Dialog
        open={isDeleteOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsDeleteOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out transform opacity-100"
            >
              <DialogTitle as="h3" className="text-lg font-medium text-gray-50">
                Are you sure?
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-300">
                This action is permanent and cannot be undone.
              </p>
              <div className="mt-4 flex gap-6 ">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                  onClick={() => {
                    deleteUser(userId);
                  }}
                >
                  Yes, Delete
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-600 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
                  onClick={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
