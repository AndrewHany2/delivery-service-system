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
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Send;
