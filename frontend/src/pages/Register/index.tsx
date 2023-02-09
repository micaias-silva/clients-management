import "./style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import backendApi from "../../services/backendApi";
import { useContext } from "react";
import { TokenContext } from "../../providers/token";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {
  const tokenCtx = useContext(TokenContext);

  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  const registerSchema = yup.object().shape({
    name: yup.string().required("Nome é necessário"),
    email: yup
      .string()
      .email("Insira um email válido")
      .required("E-mail necessário"),
    password: yup.string().required("Senha é necessária"),
    phoneNumber: yup
      .string()
      .required("Número de telefone necessário")
      .matches(phoneRegex),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitFunction = async (data: any) => {
    const response = await backendApi.post("/clients", data);

    const login = await backendApi.post("auth/login", {
      email: data.email,
      password: data.password,
    });

    tokenCtx.setToken("Bearer " + login.data.accessToken);
  };
  return (
    <div>
      {tokenCtx.token ? (
        <Redirect to="/" />
      ) : (
        <div className="register-container">
          <form
            className="register-form"
            onSubmit={handleSubmit(onSubmitFunction)}
          >
            <h3>Cadastro</h3>
            <label htmlFor="name">
              Nome
              <span>
                {errors.name ? " - " + (errors.name.message as string) : null}
              </span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Insira seu nome"
            />

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

            <label htmlFor="phoneNumber">
              Número de Telefone
              <span>
                {errors.password
                  ? " - " + (errors.password.message as string)
                  : null}
              </span>
            </label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="Insira seu número de telefone "
            />
            <p>
              Já possui uma conta? <a href="/login">Faça login</a>
            </p>
            <button type="submit">Fazer Login</button>
          </form>
          )
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
