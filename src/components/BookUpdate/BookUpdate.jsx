import "./BookUpdate.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import InfoModal from "../InfoModal/InfoModal";
import ErrorModal from "../ErrorModal/ErrorModal";
import { getToken } from "../../core/authenication";
import { SERVER_DOMAIN, SERVER_URL } from "../../core/globals";

const BookUpdate = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({
    book: {},
    categories: [],
    err: null,
    changes: null,
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
    setInfo({ ...info, loading: true });
    data.category_id = data.category;

    axios
      .put(SERVER_URL + `books/${data.book_id}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setInfo({
          ...info,
          loading: false,
          changes: !info.changes,
          message: res.data.message[0].msg,
        });
      })
      .catch((err) => {
        setInfo({ ...info, err: err.response.data.message, loading: false });
      });
  };

  useEffect(() => {
    const category_response = axios.get(SERVER_URL + "category");
    const book_response = axios.get(
      SERVER_URL + "books/join/book-category/" + id
    );

    axios
      .all([category_response, book_response])
      .then(
        axios.spread((category, book) => {
          setInfo({
            ...info,
            book: book.data,
            categories: category.data,
            loading: false,
          });
          reset({ ...book.data, category: book.data.category_id });
        })
      )
      .catch((err) => {
        setInfo({ ...info, err: err.response.data.message, loading: false });
      });
  }, []);

  return (
    <>
      <section className="react-book-update-form ">
        <section className="form-control-span">
          {errors.rack_number && (
            <span>
              <RxDotFilled /> Rack Number field is required
            </span>
          )}
          {errors.rack_number && errors.rack_number.type === "pattern" && (
            <span>
              <RxDotFilled /> Invalid Rack Number format 'should be 2 digits'
            </span>
          )}
          {errors.title && (
            <span>
              <RxDotFilled /> Title field is required
            </span>
          )}
          {errors.author && (
            <span>
              <RxDotFilled /> Author field is required
            </span>
          )}
          {errors.category && (
            <span>
              <RxDotFilled /> Category field is required
            </span>
          )}
          {errors.description && (
            <span>
              <RxDotFilled /> Description field is required
            </span>
          )}
          {errors.description && errors.description.value && (
            <span>
              <RxDotFilled />{" "}
              {`Description should be Max 200 characters (${errors.description.value.length} / 200)`}
            </span>
          )}
          {errors.photo && (
            <span>
              <RxDotFilled /> Image field is required
            </span>
          )}
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="form-body">
          <section className="form-body-lcontent">
            <img src={`${SERVER_DOMAIN}/${info.book.photo}`} alt="book_cover" />
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="form-control text-teal title-input border-left"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              id="author"
              placeholder="Author"
              className="form-control text-teal author-input border-left"
              {...register("author", { required: true })}
            />
            <select
              id="category"
              className="form-select-custom text-teal category-select border-left"
              {...register("category", { required: true })}
            >
              {info.categories &&
                info.categories.map((value) => {
                  return (
                    <option key={value.category_id} value={value.category_id}>
                      {value.category}
                    </option>
                  );
                })}
            </select>
          </section>
          <section className="form-body-rcontent text-teal">
            <section>
              <h3 className="fw-bold text-center mb-3">
                ISBN <span className="fs-4 fw-normal">{info.book.ISBN}</span>
              </h3>
              <section className="input-rfield mb-3">
                <h5 className="fw-bold">Rack #</h5>
                <input
                  type="number"
                  id="rackNumber"
                  title="Rack Number"
                  placeholder="Rack Number"
                  className="form-control text-teal border-bottom"
                  {...register("rack_number", { required: true })}
                />
              </section>
              <textarea
                id="description"
                title="Description"
                placeholder="Description"
                className="form-control text-teal border-left"
                {...register("description", { required: true, maxLength: 200 })}
              />
            </section>
            <section>
              <section className="form-control-submit col-6">
                <button type="submit" className="btn btn-outline-success">
                  Update
                </button>
              </section>
            </section>
          </section>
        </form>
      </section>
      {info.loading && <Spinner />}
      {info.message && (
        <InfoModal
          message={info.message}
          closeModal={() => setInfo({ ...info, message: null })}
        />
      )}
      {info.err && (
        <ErrorModal
          message={info.err}
          closeModal={() => setInfo({ ...info, err: null })}
        />
      )}
    </>
  );
};

export default BookUpdate;
