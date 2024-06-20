import axios from "axios";
import { SERVER_URL } from "../../../core/globals";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { HiLibrary } from "react-icons/hi";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsEyeFill, BsGenderAmbiguous } from "react-icons/bs";
import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdPhone,
  MdLock,
} from "react-icons/md";

import "./FormRegister.css";
import Spinner from "../../Spinner/Spinner";
import ErrorModal from "../../ErrorModal/ErrorModal";

const FormRegister = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [registerData, setRegisterData] = useState({
    loading: true,
    gender: null,
    role: ["librarian", "normal"],
    err: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(SERVER_URL + "gender")
      .then((res) => {
        setRegisterData({ ...registerData, loading: false, gender: res.data });
      })
      .catch((err) => {
        setRegisterData({
          ...registerData,
          loading: false,
          err: err.response.data.message,
        });
      });
  }, []);

  const onSubmit = (data) => {
    setRegisterData({ ...registerData, loading: true });

    data["gender_id"] = data.gender;
    data["type"] = "normal";
    data["status"] = "inactive";

    axios
      .post(SERVER_URL + "auth/register", data)
      .then(() => {
        navigate("/authenication/login");
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setRegisterData({
          ...registerData,
          loading: false,
          err: err.response.data.message,
        });
      });
  };
  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="react-register-form col-5"
      >
        <section className="form-control-heading text-lightblue fs-2">
          <HiLibrary /> Register
        </section>

        <section className="form-control-input mb-2">
          <MdDriveFileRenameOutline className="form-control-icon" />
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="John Smith"
            {...register("username", { required: true, minLength: 3 })}
          />
          {errors.username && errors.username.type === "required" && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <span className="text-danger">
              Name must be at least 3 characters
            </span>
          )}
        </section>

        <section className="form-control-input mb-2">
          <MdEmail className="form-control-icon" />
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="John@gmail.com"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span className="text-danger">
              This field must be a valid email
            </span>
          )}
        </section>

        <section className="form-control-input mb-2">
          <MdPhone className="form-control-icon" />
          <input
            type="tel"
            id="phone"
            className="form-control"
            placeholder="011-231-152"
            {...register("phone", { required: true, pattern: /^[0-9]{11}$/i })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.phone && errors.phone.type === "pattern" && (
            <span className="text-danger">
              This field must be a valid phone number
            </span>
          )}
        </section>

        <section className="form-control-input mb-2">
          <span
            className="password-eye-icon"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? <AiFillEyeInvisible /> : <BsEyeFill />}
          </span>
          <MdLock className="form-control-icon" />
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="********"
            autoComplete="12345678"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className="text-danger">
              Password must be at least 6 characters
            </span>
          )}
        </section>

        <section className="form-control-input mb-2">
          <MdLock className="form-control-icon" />
          <input
            type={passwordVisibility ? "text" : "password"}
            id="repassword"
            className="form-control"
            placeholder="********"
            autoComplete="12345678"
            {...register("repassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.repassword && errors.repassword.type === "required" && (
            <span className="text-danger">This field is required</span>
          )}
          {errors.repassword && errors.repassword.type === "validate" && (
            <span className="text-danger">Passwords must match</span>
          )}
        </section>

        <section className="form-control-check mb-2">
          <section>
            <BsGenderAmbiguous />
            {!registerData.loading &&
              registerData.gender.map((value, index) => {
                return (
                  <section className="form-check" key={index}>
                    <input
                      type="radio"
                      id={value.gender}
                      value={value.gender_id}
                      className="form-check-input"
                      {...register("gender", { required: true })}
                    />
                    <label
                      htmlFor={value.gender}
                      className="form-check-label text-lightblue"
                    >
                      {value.gender}
                    </label>
                  </section>
                );
              })}
          </section>
          {errors.gender && (
            <span className="text-danger">This field is required</span>
          )}
        </section>

        <section className="mb-2">
          <section className="form-check mb-2">
            <label htmlFor="terms" className="form-check-label text-lightblue">
              I agree with terms and conditions
            </label>
            <input
              type="checkbox"
              id="terms"
              className="form-check-input"
              {...register("terms", { required: true })}
            />
          </section>
          {errors.terms && errors.terms.type === "required" && (
            <span className="text-danger">
              You must agree with the terms and conditions
            </span>
          )}
        </section>

        <section className="form-control-submit col-6">
          <button type="submit" className="btn btn-outline-success mb-2">
            Sign Up
          </button>
          <Link
            className="text-lightblue small-text text-center"
            to="/authenication/login"
          >
            Already have account? login
          </Link>
        </section>
      </form>
      {registerData.loading && <Spinner />}
      {registerData.err && (
        <ErrorModal
          message={registerData.err}
          closeModal={() => setRegisterData({ ...registerData, err: null })}
        />
      )}
    </>
  );
};

export default FormRegister;
