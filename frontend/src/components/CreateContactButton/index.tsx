import "./style.css";

import Modal from "react-modal";
import { useState } from "react";
import CreateContactForm from "../CreateContactForm";
import ReactModal from "react-modal";

const CreateConctact = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const customStyles = {
    content: {},
    "@media (max-width: 600px)": {
      width: "90%",
    },
  };

  return (
    <div>
      <button
        className="create-contact-button"
        onClick={() => setIsOpen(!modalIsOpen)}
      >
        +
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        className="modal"
        onRequestClose={() => setIsOpen(false)}
        overlayClassName="modal-overlay"
      >
        <CreateContactForm />
      </ReactModal>
    </div>
  );
};

export default CreateConctact;
