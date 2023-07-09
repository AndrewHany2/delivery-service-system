import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const mutation = useMutation(login, {
    onSuccess: (response) => {
      localStorage.setItem("user", response.data);
      navigate("/");
    },
  });
  return (
    <Formik
      validationSchema={Yup.object().shape({
        email: Yup.string().required("Required").email("Invalid email"),
        password: Yup.string().min(5).required("Required"),
      })}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          mutation.mutate(values, { onSuccess: () => resetForm() });
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <div className="form-container">
          <Form className="form">
            <div className="form-content">
              <h3 className="form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                )}
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
              {mutation.isError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {mutation.error.response.data.message}
                </div>
              )}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
