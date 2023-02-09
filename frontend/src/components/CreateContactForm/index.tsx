import "./style.css";
import * as yup from "yup";
import backendApi from "../../services/backendApi";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TokenContext } from "../../providers/token";
import { UpdateContext } from "../../providers/update";

interface CreateContactProps {
  closeModal: () => void;
}

const CreateContactForm = ({ closeModal }: CreateContactProps) => {
  const tokenCtx = useContext(TokenContext);
  const updateCtx = useContext(UpdateContext);

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

  const createContact = async (data: any) => {
    await backendApi.post("/contacts", data, {
      headers: { Authorization: tokenCtx.token },
    });
    updateCtx.refresh();
  };

  const onSubmitFunction = (data: any) => {
    createContact(data);
    closeModal();
  };

  return (
    <div>
      <div className="fill"></div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Criar contato</h2>

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
    </div>
  );
};
export default CreateContactForm;
