import * as yup from "yup";

export const basicSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Not a valid e-mail").required("Required"),
  age: yup.number().positive().integer().required("Required"),
  role: yup
    .string()
    .oneOf(["admin", "editor", "viewer"], "Not a role")
    .required("Required"),
});
