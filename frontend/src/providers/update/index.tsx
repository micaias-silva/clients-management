import { createContext, ReactNode, useState } from "react";

const initial = false;

interface UpdateProviderProps {
  children: ReactNode;
}

interface UpdateValueProps {
  update: boolean;
  refresh: () => void;
}

export const UpdateContext = createContext<UpdateValueProps>({
  update: initial,
  refresh: () => undefined,
});

export const UpdateProvider: React.FC<UpdateProviderProps> = ({ children }) => {
  const [update, setUpdate] = useState(initial);

  const refresh = () => {
    setUpdate(!update);
  };
  return (
    <UpdateContext.Provider value={{ update, refresh }}>
      {children}
    </UpdateContext.Provider>
  );
};
