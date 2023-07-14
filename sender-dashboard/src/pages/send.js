import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "react-query";

import * as Yup from "yup";
import { send } from "../api";

function Send() {
  const mutation = useMutation(send, {
    onSuccess: (response) => {},
  });
  return (
    <div>
      <Formik
        validationSchema={Yup.object().shape({
          pickupAddress: Yup.string().required("Required"),
          dropoffAddress: Yup.string().required("Required"),
        })}
        initialValues={{ pickupAddress: "", dropoffAddress: "" }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutation.mutate(values, { onSuccess: () => resetForm() });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          /* and other goodies */
        }) => (
          <Form className="mx-5">
            <div className="form-group my-5">
              <label htmlFor="exampleInputEmail1">Pickup address</label>
              <Field
                type="text"
                name="pickupAddress"
                className="form-control"
                placeholder="Pickup address"
                value={values.pickupAddress}
              />
              {touched.pickupAddress && errors.pickupAddress && (
                <ErrorMessage
                  name="pickupAddress"
                  component="div"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Drop-off address</label>
              <Field
                type="text"
                name="dropoffAddress"
                className="form-control"
                placeholder="Drop-off address"
                value={values.dropoffAddress}
              />
              {touched.dropoffAddress && errors.dropoffAddress && (
                <ErrorMessage
                  name="dropoffAddress"
                  component="div"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={mutation.isLoading}
            >
              Submit
            </button>
            {mutation.isError && (
              <div className="alert alert-danger mt-3" role="alert">
                {mutation.error?.response
                  ? mutation.error?.response?.data?.message
                  : mutation.error?.message}
              </div>
            )}
            {mutation.isSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                Parcel Created Successfully, Thanks
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Send;
