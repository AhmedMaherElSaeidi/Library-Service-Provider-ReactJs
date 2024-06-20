import { BsTwitterX } from "react-icons/bs";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-center text-white"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <section className="container pt-4">
        <section className="row mb-3">
          <section className="col-6">
            Unleash the magic of words at LSP. Immerse yourself in a world of
            endless possibilities, where every page is an invitation to explore,
            imagine, and discover.
          </section>
          <section className="col-6">
            Unlock the doors to imagination with LSP. Where reading becomes a
            journey, and every book is a portal to new worlds waiting to be
            explored.
          </section>
        </section>
        <section className="mb-4 footer-icons">
          <a
            className="btn btn-outline-secondary btn-lg text-white m-1"
            href="#"
          >
            <BsFacebook />
          </a>
          <a
            className="btn btn-outline-secondary btn-lg text-white m-1"
            href="#"
          >
            <BsInstagram />
          </a>
          <a
            className="btn btn-outline-secondary btn-lg text-white m-1"
            href="#"
          >
            <BsTwitterX />
          </a>
        </section>
      </section>

      <section
        className="text-center text-lightblue p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy;Copyright 2022/2023 LSP library
      </section>
    </footer>
  );
};

export default Footer;
