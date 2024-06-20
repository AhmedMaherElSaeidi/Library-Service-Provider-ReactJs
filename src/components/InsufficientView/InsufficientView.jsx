import { TiWarningOutline } from "react-icons/ti";
import "./InsufficientView.css";

const InsufficientView = () => {
  return (
      <section className="insufficient-view d-flex justify-content-center align-items-center">
        <section className="alert alert-warning text-center">
          <h3>
            <TiWarningOutline /> A PC OR LAPTOP IS REQUIRED TO VIEW THIS PAGE
          </h3>
        </section>
      </section>
  );
};

export default InsufficientView;
