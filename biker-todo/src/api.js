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
export function pickParcelAPI(parcel) {
  const auth = JSON.parse(localStorage.getItem("user"));
  return axios.post(
    `${baseUrl}/api/biker/pick-parcel`,
    {
      _id: parcel._id,
      pickupDateTime: parcel.pickupDateTime,
      dropoffDateTime: parcel.dropoffDateTime,
    },
    {
      headers: {
        authorization: auth.token,
      },
    }
  );
}
