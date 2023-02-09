import "./style.css";
import * as yup from "yup";
import backendApi from "../../services/backendApi";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TokenContext } from "../../providers/token";
import { UpdateContext } from "../../providers/update";

interface ContactFormProps {
  contactId: string;
  closeForm: () => void;
}

const UpdateContactForm = ({ contactId, closeForm }: ContactFormProps) => {
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

  const updateCtx = useContext(UpdateContext);
  const tokenCtx = useContext(TokenContext);

  const contactSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email("Email inválido"),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: "Número de telefone inválido",
      excludeEmptyString: true,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const updateContact = async (contactId: string, data: any) => {
    await backendApi.patch(`/contacts/${contactId}`, data, {
      headers: { Authorization: tokenCtx.token },
    });

    updateCtx.refresh();
  };

  const onSubmitFunction = async (data: any) => {
    data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v));
    updateContact(contactId, data);
    closeForm();
  };

  return (
    <>
      <div className="fill"></div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <h2>Atualizar contato</h2>

        <span>{errors.name ? (errors.name?.message as string) : null}</span>
        <input {...register("name")} placeholder="Nome" />

        <span>{errors.email ? (errors.email?.message as string) : null}</span>
        <input {...register("email")} type="email" placeholder="E-mail" />

        <span>
          {errors.phoneNumber ? (errors.phoneNumber?.message as string) : null}
        </span>
        <input {...register("phoneNumber")} type="tel" placeholder="Telefone" />

        <button
          onClick={closeForm}
          style={{
            background: "var(--color-white-2",
            color: "var(--color-blue)",
          }}
          type="reset"
        >
          Cancelar
        </button>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
};
export default UpdateContactForm;
