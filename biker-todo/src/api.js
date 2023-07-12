import axios from "axios";
const baseUrl = "http://localhost:3000";

export function login({ email, password }) {
  return axios.post(`${baseUrl}/api/biker/login`, { email, password });
}
export function getParcels() {
  const auth = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${baseUrl}/api/biker/parcels`, {
    headers: {
      authorization: auth.token,
    },
  });
}
