import "./AboutRow.css";

const AboutRow = ({ heading, children }) => {
  return (
    <section className="about-row-component">
      <h2 className="text-wheat">{heading}</h2>
      <p className="about-p">{children}</p>
      <hr />
    </section>
  );
};

export default AboutRow;
