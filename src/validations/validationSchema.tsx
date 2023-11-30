import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required("User name is required")
    .matches(/^[a-zA-Z0-9_]+$/, "User name can only contain letters, numbers, and underscores")
    .min(3, "User name must be at least 3 characters")
    .max(20, "User name must be at most 20 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/^(?=.[a-z])/, "Password must include at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/, "Password must include at least one uppercase letter")
    .matches(/^(?=.*[!@#$%^&*()_+{}[\]':;<>,.?~/-])/, "Password must include at least one special character."),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match")
});
