import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000 * 10 ** 3,
  headers: {},
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    toast.error(error.response?.data?.message || "something went wrong");
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
