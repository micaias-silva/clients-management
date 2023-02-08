import "./style.css";
import { useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import backendApi from "../../services/backendApi";
import { TokenContext } from "../../providers/token";

const CreateContactForm = () => {
  const ctx = useContext(TokenContext);
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

  const contactSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    phoneNumber: yup
      .string()
      .required("Campo Obrigatório")
      .matches(phoneRegex, "Número de telefone inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmitFunction = (data: any) => {
    backendApi.post("/contacts", data, {
      headers: { Authorization: ctx.token },
    });
  };

  return (
    <>
      <div className="fill"></div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Criar novo contato</h2>
        <span>{errors.name ? (errors.name?.message as string) : null}</span>
        <input {...register("name")} placeholder="Nome" />
        <span>{errors.email ? (errors.email?.message as string) : null}</span>
        <input {...register("email")} type="email" placeholder="E-mail" />
        <span>
          {errors.phoneNumber ? (errors.phoneNumber?.message as string) : null}
        </span>
        <input {...register("phoneNumber")} type="tel" placeholder="Telefone" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};
export default CreateContactForm;
