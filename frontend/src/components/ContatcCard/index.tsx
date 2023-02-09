import "./style.css";
import { useContext, useState } from "react";
import ReactModal from "react-modal";
import UpdateContactForm from "../UpdateContactForm";
import backendApi from "../../services/backendApi";
import { TokenContext } from "../../providers/token";
import { UpdateContext } from "../../providers/update";

interface ContactProps {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const ContactCard = ({ id, name, email, phoneNumber }: ContactProps) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const tokenCtx = useContext(TokenContext);
  const updateCtx = useContext(UpdateContext);

  const deleteContact = async () => {
    await backendApi.delete(`/contacts/${id}`, {
      headers: { Authorization: tokenCtx.token },
    });
    updateCtx.refresh();
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!modalIsOpen)}
        className="contact-card"
        id={id}
      >
        <p>{name}</p>
        <a className="hide-mobile" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="hide-mobile" href={`tel:${phoneNumber}`}>
          {phoneNumber}
        </a>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(!modalIsOpen);
          setEditMode(false);
        }}
        className="modal"
        overlayClassName="modal-overlay"
      >
        {editMode ? (
          <UpdateContactForm
            closeForm={() => setEditMode(false)}
            contactId={id}
          />
        ) : (
          <>
            <div className="fill" />
            <div className="contact-info">
              <h2>Dados do Contato</h2>

              <p>{name}</p>
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>

              <button onClick={() => setEditMode(true)}>Editar</button>

              <button
                style={{ background: "var(--color-red)" }}
                onClick={() => {
                  setIsOpen(false);
                  deleteContact();
                }}
              >
                Deletar
              </button>
            </div>
          </>
        )}
      </ReactModal>
    </div>
  );
};

export default ContactCard;
