import FormContainer from "../../components/Form/FormContainer/FormContainer";
import FormRegister from "../../components/Form/FormRegister/FormRegister";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <FormContainer parentClass="regesteration-form">
      <FormRegister />
    </FormContainer>
  );
};

export default RegisterPage;
