import "./ErrorModal.css";
import { VscChromeClose } from "react-icons/vsc";

const ErrorModal = ({ message, closeModal }) => {
  return (
    <section className="err-modal-container">
      {message.map((msg, index) => (
        <section key={index} className="alert alert-danger mb-2">
          {msg.msg}
        </section>
      ))}
      <span className="bg-danger" onClick={closeModal} title="close">
        <VscChromeClose />
      </span>
    </section>
  );
};

export default ErrorModal;
