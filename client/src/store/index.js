import { createContext, useContext } from "react";

//we create the store
export const AuthContext = createContext({});

//we give the store a name we call in order to use it
export const useAuth = () => {
  const authStore = useContext(AuthContext);
  if (authStore === undefined) {
    throw new Error("useAuth must be defined within an AuthProvider");
  }
  return authStore;
};
