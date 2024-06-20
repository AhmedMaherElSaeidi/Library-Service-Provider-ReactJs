import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormInput.css";

const FormInput = ({ children, inputType, inputValue, inputMethod }) => {
  const [input, setInput] = useState(inputValue);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("form_input", inputValue);
  }, [setValue]);

  const onSubmit = (data) => {
    if (input == data.form_input) return;

    setInput(data.form_input);
    inputMethod(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="input-control-form">
      <section className="form-control-input">
        <input type={inputType} id="input" className="form-control" {...register("form_input", { required: true })} />
      </section>
      {errors.form_input && errors.form_input.type === "required" && <span className="text-danger small-text">Not Valid</span>}
      <section className="form-control-submit">{children}</section>
    </form>
  );
};

export default FormInput;
