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
          const filteredData = res.data.filter(
            (item) => item.email === currentUser.email
          );

          updateProfile(auth.currentUser, {
            displayName: filteredData[0].name,
            photoURL: filteredData[0].image,
          });
        });

        console.log("user =>", currentUser);
      }
      console.log("user =>", currentUser);
      // setUser(null);
      setisloading(false);
    });
    return () => unsubscribe();
  }, []);

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
