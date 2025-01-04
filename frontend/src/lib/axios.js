import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://doc-shelf.onrender.com/api/v1",
  withCredentials: true,
});
