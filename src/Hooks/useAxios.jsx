import axios from "axios";
import { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";

const axiosInterface = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

function useAxios() {
  const { SignOutUser } = useContext(AUthfirebase);

  axiosInterface.interceptors.request.use(
    (response) => {
      const token = localStorage.getItem("access-token");
      //("intersept by interceptor axios", token);
      response.headers.authorization = `Bearer ${token}`;

      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosInterface.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await SignOutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInterface;
}

export default useAxios;
