import "./style.css";

import Modal from "react-modal";
import { useState } from "react";
import CreateContactForm from "../CreateContactForm";
import ReactModal from "react-modal";

const CreateConctactButton = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

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
        <CreateContactForm closeModal={() => setIsOpen(false)} />
      </ReactModal>
    </div>
  );
};

export default CreateConctactButton;
