import { createContext, ReactNode, useEffect, useState } from "react";
import backendApi from "../../services/backendApi";

const initial: string | null =
  localStorage.getItem("token") || sessionStorage.getItem("token");

interface TokenProviderProps {
  children: ReactNode;
}

interface ContextValueProps {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

export const TokenContext = createContext<ContextValueProps>({
  token: initial,
  setToken: () => undefined,
});

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState(initial);

  const validateToken = async () => {
    await backendApi
      .post("/auth/validate", {}, { headers: { Authorization: token } })
      .then((res) => res.data)
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
      });
  };
  useEffect(() => {
    validateToken();
  });

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
