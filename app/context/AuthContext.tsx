import { createContext, useState } from "react";

const AuthContext = createContext({
  isAuthorized: false,
  setIsAuthorized: (isAuthorized: boolean) => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
