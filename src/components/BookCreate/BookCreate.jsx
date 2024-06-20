import axios from "axios";
import { SERVER_URL } from "../../core/globals";
import { getUser, getToken } from "../../core/authenication";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import "./BookCreate.css";
import { GiOpenBook } from "react-icons/gi";
import Spinner from "../Spinner/Spinner";
import InfoModal from "../InfoModal/InfoModal";
import ErrorModal from "../ErrorModal/ErrorModal";

const BookCreate = () => {
  const [formData, setFormData] = useState({
    categories: [],
    err: null,
    message: null,
    loading: true,
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm();
  const onSubmit = (data) => {
    const form = new FormData();
    setFormData({ ...formData, loading: true });

    form.append("photo", data.image[0]);
    form.append("category_id", data.category);
    form.append("user_id", getUser().userID);
    form.append("ISBN", data.ISBN);
    form.append("author", data.author);
    form.append("category", data.category);
    form.append("description", data.description);
    form.append("rack_number", data.rack_number);
    form.append("title", data.title);

    axios
      .post(SERVER_URL + "books", form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        reset();
        setFormData({
          ...formData,
          loading: false,
          message: res.data.message[0].msg,
        });
      })
      .catch((err) => {
        setFormData({
          ...formData,
          loading: false,
          err: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "category")
      .then((res) => {
        setFormData({ ...formData, loading: false, categories: res.data });
      })
      .catch((err) => {
        setFormData({
          ...formData,
          loading: false,
          err: err.response.data.message,
        });
      });
  }, []);

  return (
    <>
      <section className="book-creation-container">
        <section className="book-creation-heading mb-2">
          <h3>
            <GiOpenBook /> Book Insertion
          </h3>
        </section>
        <section className="creation-body-form">
          <form onSubmit={handleSubmit(onSubmit)} className="react-book-form">
            <section className="mb-2 form-control-input">
              <input
                type="text"
                id="ISBN"
                placeholder="Book ISBN"
                className="form-control"
                {...register("ISBN", { required: true, pattern: /^\d{8}$/ })}
              />
              {errors.ISBN?.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.ISBN?.type === "pattern" && (
                <span>Invalid ISBN format</span>
              )}
            </section>

            <section className="mb-2 form-control-input">
              <input
                type="text"
                id="rack_number"
                placeholder="Rack Number"
                className="form-control"
                {...register("rack_number", { required: true })}
              />
              {errors.rack_number && <span>This field is required</span>}
            </section>

            <section className="mb-2 form-control-input">
              <input
                type="text"
                id="title"
                placeholder="title"
                className="form-control"
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </section>

            <section className="mb-2 form-control-input">
              <input
                type="text"
                id="author"
                placeholder="Author"
                className="form-control"
                {...register("author", { required: true })}
              />
              {errors.author && <span>This field is required</span>}
            </section>

            <section className="mb-2 form-control-select">
              <select
                id="category"
                className="form-select"
                {...register("category", { required: true })}
              >
                <option value={-1}>-- Select a category --</option>
                {formData.categories.map((value) => {
                  return (
                    <option key={value.category_id} value={value.category_id}>
                      {value.category}
                    </option>
                  );
                })}
              </select>
              {errors.category && <span>This field is required</span>}
            </section>

            <section className="mb-2 form-control-textarea">
              <textarea
                id="description"
                placeholder="Description"
                className="form-control"
                {...register("description", { required: true, maxLength: 200 })}
              />
              {errors.description && <span>This field is required</span>}
              {errors.description && errors.description.value && (
                <span>{`Max 200 characters (${errors.description.value.length} / 200)`}</span>
              )}
            </section>

            <section className="mb-2 form-control-input">
              <input
                type="file"
                id="image"
                placeholder="Image"
                className="form-control"
                {...register("image", { required: true })}
              />
              {errors.image && <span>This field is required</span>}
            </section>

            <section className="form-control-submit col-6">
              <button type="submit" className="btn btn-outline-success">
                Create
              </button>
            </section>
          </form>
        </section>
      </section>
      {formData.message && (
        <InfoModal
          message={formData.message}
          closeModal={() => setFormData({ ...formData, message: null })}
        />
      )}
      {formData.loading && <Spinner />}
      {formData.err && (
        <ErrorModal
          message={formData.err}
          closeModal={() => setFormData({ ...formData, err: null })}
        />
      )}
    </>
  );
};

export default BookCreate;
