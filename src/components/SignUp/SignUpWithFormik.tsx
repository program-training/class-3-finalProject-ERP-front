
import { withFormik } from "formik";

import { validationSchema } from "../../validations/validationSchema";
import { SignUp } from "./SignUpForm";

export default withFormik({
  mapPropsToValues: () => ({
    userName: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },
})(SignUp);
