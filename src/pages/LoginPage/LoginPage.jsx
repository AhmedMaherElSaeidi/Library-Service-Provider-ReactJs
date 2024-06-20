import FormContainer from "../../components/Form/FormContainer/FormContainer";
import FormLogin from "../../components/Form/FormLogin/FormLogin";
import "./LoginPage.css";

const LoginPage = () => {

  return (
    <FormContainer parentClass="login-form">
      <FormLogin/>
    </FormContainer>
  );
};

export default LoginPage;
