import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import backendApi from "../../services/backendApi";
import { AxiosError } from "axios";
import { useContext } from "react";
import { TokenContext } from "../../providers/token";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const ctx = useContext(TokenContext);

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
    const response = await backendApi.post("/auth/login", data);

    const token = response.data.accessToken;
    if (token) {
      ctx.setToken("Bearer " + token);
      localStorage.setItem("token", "Bearer " + token);
    }
  };

  return (
    <div>
      {ctx.token ? (
        <Redirect to="/" />
      ) : (
        <form onSubmit={handleSubmit(onSubmitFunction)}>
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
          <button type="submit">Fazer Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
