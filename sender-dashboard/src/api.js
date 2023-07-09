import axios from "axios";
const baseUrl = "http://localhost:3000";

export function login({ email, password }) {
  return axios.post(`${baseUrl}/api/biker/login`, { email, password });
}

export function send({ email, password }) {
  return axios.post(`${baseUrl}/api/parcel/send`, { email, password });
}
