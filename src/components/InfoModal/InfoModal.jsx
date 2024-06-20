import { VscChromeClose } from "react-icons/vsc";
import "./InfoModal.css";

const InfoModal = ({ message, closeModal }) => {
  return (
    <section className="info-modal-container">
      <section className="alert alert-success">{message}</section>
      <span className="bg-success" title="Close" onClick={closeModal}>
        <VscChromeClose />
      </span>
    </section>
  );
};

export default InfoModal;
