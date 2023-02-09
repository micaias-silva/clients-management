import "./style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import backendApi from "../../services/backendApi";
import { useContext } from "react";
import { TokenContext } from "../../providers/token";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const tokenCtx = useContext(TokenContext);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("E-mail necessário"),
    password: yup.string().required("Senha é necessária"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitFunction = async (data: any) => {
    const response = await backendApi
      .post("/auth/login", data)
      .then((res) => res)
      .catch(() => {
        toast.error("Email/Senha Inválidos");
      });

    if (response) {
      const token = response.data.accessToken;
      if (token) {
        tokenCtx.setToken("Bearer " + token);
        localStorage.setItem("token", "Bearer " + token);
      }
    }
  };

  return (
    <div className="login-container">
      {tokenCtx.token ? (
        <Redirect to="/" />
      ) : (
        <form className="login-form" onSubmit={handleSubmit(onSubmitFunction)}>
          <h3>Login</h3>
          <label htmlFor="email">
            Email
            <span>
              {errors.email ? " - " + (errors.email.message as string) : null}
            </span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Insira seu email"
          />
          <label htmlFor="password">
            Senha
            <span>
              {errors.password
                ? " - " + (errors.password.message as string)
                : null}
            </span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Insira sua senha"
          />
          <p>
            Não possui uma conta? <a href="/register">Cadastre-se</a>
          </p>
          <button type="submit">Fazer Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
