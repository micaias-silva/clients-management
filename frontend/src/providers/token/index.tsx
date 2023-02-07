import { createContext, ReactNode, useState } from "react";

const initial: string | null =
  localStorage.getItem("token") || sessionStorage.getItem("token");

interface TokenProviderProps {
  children: ReactNode;
}

interface ContextValueProps {
  token: string | null;
  setToken: (newToken: string) => void;
}

export const TokenContext = createContext<ContextValueProps>({
  token: initial,
  setToken: () => undefined,
});

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState(initial);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
