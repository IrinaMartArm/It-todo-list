import { useAppDispatch } from "common/hooks/Hooks";
import { FormikHelpers, useFormik } from "formik";
import { FormDataType, ResponseType } from "common/types";
import { AuthThunks } from "components/Login/AuthReducer";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useFormik<FormDataType>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    // validate: (values) => {
    //     const errors: Partial<Omit<FormDataType, 'rememberMe'>> = {}
    //     if (!values.email) {
    //         errors.email = 'Required'
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address'
    //     }
    //     if(!values.password) {
    //         errors.password = 'Required'
    //     } else if(values.password.length < 5) {
    //         errors.password = 'Password so small!'
    //     }
    //     return errors
    // },
    onSubmit: async (
      values: FormDataType,
      formikHelpers: FormikHelpers<FormDataType>,
    ) => {
      dispatch(AuthThunks.LogIn(values))
        .unwrap()
        .catch((err: ResponseType) => {
          err.fieldErrors?.forEach((fe) =>
            formikHelpers.setFieldError(fe.field, fe.error),
          );
        });

      // .then((data) => {
      //     if(data?.resultCode === 0)
      //     formik.resetForm()
      // })
    },
  });
};
