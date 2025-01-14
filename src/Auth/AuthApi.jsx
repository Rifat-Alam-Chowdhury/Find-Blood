import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./FirebaseAuth";
export const AUthfirebase = createContext();
function AuthApi({ children }) {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const CreateUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user =>", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const values = {
    CreateUser,
    SignOutUser,
    user,
  };

  return (
    <AUthfirebase.Provider value={values}>{children}</AUthfirebase.Provider>
  );
}

export default AuthApi;
