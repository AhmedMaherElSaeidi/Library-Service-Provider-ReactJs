import "./Spinner.css";

const Spinner = () => {
  return (
    <section className="lds-roller-container">
      <section className="lds-roller">
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </section>
      <section>Loading...</section>
    </section>
  );
};

export default Spinner;
