import axios from "axios";
import { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";

const axiosInterface = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

function useAxios() {
  const { SignOutUser } = useContext(AUthfirebase);

  axiosInterface.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        SignOutUser();
      }

      return Promise.reject(err);
    }
  );

  return axiosInterface;
}

export default useAxios;
