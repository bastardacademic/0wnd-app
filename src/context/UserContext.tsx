import React, { createContext, useContext } from "react";

type User = {
  id: string;
  role: "dom" | "sub" | "switch";
  displayName: string;
};

const defaultUser: User = {
  id: "sub123",
  role: "sub",
  displayName: "Sub Test"
};

const UserContext = createContext<User>(defaultUser);

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={defaultUser}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
