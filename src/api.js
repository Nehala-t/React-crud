import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

console.log("AXIOS BASE URL:", api.defaults.baseURL);
export default api;