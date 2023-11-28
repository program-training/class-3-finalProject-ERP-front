import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userName: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+$/, 
      "User name can only contain letters, numbers, and underscores"
    )
    .min(3, "User name must be at least 3 characters")
    .max(20, "User name must be at most 20 characters")
    .required("User name is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(
      /^(?=.*[a-z])/,
      "Password must include at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must include at least one uppercase letter"
    )
    .matches(
      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
      "Password must include at least one special character"
    )    
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password"),
});


