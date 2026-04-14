import React, { createContext, useContext, useState } from "react";

type Role = "dom" | "sub" | "switch";

type User = {
  id: string;
  role: Role;
  displayName: string;
  setRole: (role: Role) => void;
};

const defaultUser: User = {
  id: "69de97027af1c2ddb873ceca",
  role: "sub",
  displayName: "Test User",
  setRole: () => {},
};

const UserContext = createContext<User>(defaultUser);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>("sub");

  return (
    <UserContext.Provider value={{ id: "69de97027af1c2ddb873ceca", role, displayName: "Test User", setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
