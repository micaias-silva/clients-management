import { ReactNode } from "react";
import { TokenProvider } from "./token";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <TokenProvider>{children}</TokenProvider>;
};

export default Providers;
