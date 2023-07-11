import axios from "axios";
const baseUrl = "http://localhost:3000";

export function login({ email, password }) {
  return axios.post(`${baseUrl}/api/sender/login`, { email, password });
}

export function send({ pickupAddress, dropoffAddress }) {
  const auth = JSON.parse(localStorage.getItem("user"));
  return axios.post(
    `${baseUrl}/api/sender/parcel/send`,
    {
      pickupAddress,
      dropoffAddress,
    },
    {
      headers: {
        authorization: auth.token,
      },
    }
  );
}

export function getParcels() {
  const auth = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${baseUrl}/api/parcel/`, {
    headers: {
      authorization: auth.token,
    },
  });
}
