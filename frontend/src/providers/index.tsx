import { ReactNode } from "react";
import { TokenProvider } from "./token";
import { UpdateProvider } from "./update";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <TokenProvider>
      <UpdateProvider>{children}</UpdateProvider>
    </TokenProvider>
  );
};

export default Providers;
