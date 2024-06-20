import axios from "axios";
import { SERVER_URL } from "../../../core/globals";
import { setToken } from "../../../core/authenication";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { BsEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { HiUser, HiLockClosed, HiLibrary } from "react-icons/hi";

import "./FormLogin.css";
import Spinner from "../../Spinner/Spinner";
import ErrorModal from "../../ErrorModal/ErrorModal";

const FormLogin = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginData, setLoginData] = useState({
    loading: false,
    err: null,
  });

  const onSubmit = (data) => {
    setLoginData({ ...loginData, loading: true });
    axios
      .post(SERVER_URL + "auth/login", data)
      .then((res) => {
        setToken(res.data.token);
        navigate("/pages/home");
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setLoginData({ err: err.response.data.message, loading: false });
      });
  };
  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="react-login-form"
      >
        <section className="form-control-heading text-lightblue fs-2">
          <HiLibrary /> SignIn
        </section>

        <section className="form-control-input mb-2">
          <HiUser className="form-control-icon" />
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="email@gmail.com"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <span className="text-danger">
              This field is required and must be a valid email
            </span>
          )}
        </section>

        <section className="form-control-input mb-2">
          <HiLockClosed className="form-control-icon" />
          <span
            className="password-eye-icon"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? <AiFillEyeInvisible /> : <BsEyeFill />}
          </span>
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="********"
            autoComplete="12345678"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">
              This field is required and must be a valid password
            </span>
          )}
        </section>

        <section className="form-control-submit col-6">
          <button type="submit" className="btn btn-outline-success mb-1">
            Sign In
          </button>
          <Link
            className="text-lightblue text-center small-text"
            to="/authenication/register"
          >
            Register? I don't have account
          </Link>
        </section>
      </form>
      {loginData.loading && <Spinner />}
      {loginData.err && (
        <ErrorModal
          closeModal={() => setLoginData({ ...loginData, err: null })}
          message={loginData.err}
        />
      )}
    </>
  );
};

export default FormLogin;
