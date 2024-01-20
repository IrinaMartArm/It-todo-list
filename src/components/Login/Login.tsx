import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { getIsAuth } from "common/utils";
import { AuthThunks } from "components/Login/AuthReducer";
import { ResponseType } from "common/types";

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const formik = useFormik<FormDataType>({
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

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}

              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                disabled={formik.isSubmitting}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
        email
      </Grid>
    </Grid>
  );
};
