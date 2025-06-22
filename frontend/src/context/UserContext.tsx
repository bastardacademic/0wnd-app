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

export const UserContext = createContext<{
  user?: User;
  setUser: (u?: User) => void;
}>({ setUser: () => {} });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
