import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./FirebaseAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AUthfirebase = createContext();
function AuthApi({ children }) {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [isloading, setisloading] = useState(true);
  const provider = new GoogleAuthProvider();
  const CreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const LogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setisloading(false);

        axiosPublic("/").then((res) => {
          console.log(res.data);

          const filteredData = res?.data?.filter(
            (item) => item.email == currentUser.email
          );
          console.log(filteredData);

          updateProfile(auth.currentUser, {
            displayName: filteredData[0]?.name,
            photoURL: filteredData[0]?.image,
          });
        });
        axiosPublic.post("/jwt", { email: currentUser?.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res?.data?.token);
            setisloading(false);
          }
        });

        console.log("user =>", currentUser);
      }
      // localStorage.removeItem("access-token");
      console.log("user =>", currentUser);
      // setUser(null);
      setisloading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const values = {
    CreateUser,
    SignOutUser,
    user,
    LogIn,
    isloading,
  };

  return (
    <AUthfirebase.Provider value={values}>{children}</AUthfirebase.Provider>
  );
}

export default AuthApi;
