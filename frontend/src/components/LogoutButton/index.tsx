import { useContext } from "react";
import "./style.css";
import { TokenContext } from "../../providers/token";
export const LogoutButton = () => {
  const tokenCtx = useContext(TokenContext);

  const logout = () => {
    localStorage.removeItem("token");
    tokenCtx.setToken(null);
  };
  return (
    <button className="logout-button" onClick={logout}>
      <img src="https://img.icons8.com/material/16/exit.svg" />
      Logout
    </button>
  );
};
export default LogoutButton;
