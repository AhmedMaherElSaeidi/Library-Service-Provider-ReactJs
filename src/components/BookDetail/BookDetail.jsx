import "./BookDetail.css";
import { RxDotFilled } from "react-icons/rx";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import Spinner from "../Spinner/Spinner";
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SERVER_DOMAIN, SERVER_URL } from "../../core/globals";
import { getUser, getToken, isAuth } from "../../core/authenication";

const BookDetail = () => {
  const { id } = useParams();
  const normal_user = isAuth() && getUser().type == "normal";
  const [info, setInfo] = useState({
    loading: true,
    book: {},
    user: {},
    err: null,
    changes: null,
    message: null,
  });

  const borrow_book = (book_id) => {
    axios
      .post(
        SERVER_URL + "borrows",
        { user_id: getUser().userID, book_id },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        setInfo({
          ...info,
          message: res.data.message[0].msg,
          loading: false,
          changes: !info.changes,
        });
      })
      .catch((err) => {
        setInfo({ ...info, err: err.response.data.message, loading: false });
      });
  };
  const cancel_request = (id) => {
    setInfo({ ...info, loading: true });
    axios
      .delete(SERVER_URL + `borrows/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        // console.log(res.data.message[0].msg);
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
    const fetchBookAndUser = async () => {
      try {
        const bookResponse = await axios.get(
          SERVER_URL + "books/join/book-category-borrow/" + id
        );
        const userResponse = await axios.get(
          `${SERVER_URL}users/join/user-book/${getUser().userID}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setInfo({
          ...info,
          book: bookResponse.data,
          user: userResponse.data,
          loading: false,
        });
      } catch (err) {
        setInfo({
          ...info,
          err: err.response?.data?.message || "An error occurred",
          loading: false,
        });
      }
    };

    fetchBookAndUser();
  }, [info.changes]);

  return (
    <section className="Book-detail-page">
      {!info.loading && (
        <section className="horizontal-card">
          <section className="card-details text-white">
            <section className="mb-2 fw-bold">
              <h2>{info.book.title}</h2>
              <h4>{info.book.author}</h4>
            </section>
            <section className="mb-1">{info.book.description}</section>
            <section className="mb-1">
              <span className="fw-bold">ISBN</span> {info.book.ISBN}{" "}
              <RxDotFilled /> <span className="fw-bold">RackNumber</span>{" "}
              {info.book.rack_number} <RxDotFilled />{" "}
              <span className="fw-bold">
                {info.book.category_book.category}
              </span>
            </section>
            <section className="card-details-bottom-border mb-2"></section>
            <section className="card-btn">
              <span>
                <Link className="btn btn-info" to="/pages/books">
                  <MdOutlineKeyboardReturn /> Return
                </Link>
              </span>
              {normal_user &&
                info.book &&
                info.book.book_borrow.length == 0 &&
                info.user &&
                info.user.user_borrow.length < info.user.borrowCount && (
                  <span
                    className="btn btn-warning"
                    onClick={() => borrow_book(info.book.book_id)}
                  >
                    Borrow
                  </span>
                )}
              {normal_user &&
                info.book &&
                info.book.book_borrow[0] &&
                info.book.book_borrow[0].user_id == getUser().userID &&
                info.book.book_borrow[0].status != "waiting" && (
                  <Link to={"/pages/cart"}>
                    <span className="btn btn-danger">Borrowed</span>
                  </Link>
                )}
              {normal_user &&
                info.book &&
                info.book.book_borrow[0] &&
                info.book.book_borrow[0].user_id == getUser().userID &&
                info.book.book_borrow[0].status == "waiting" && (
                  <span
                    className="btn btn-danger"
                    title="Cancel Request"
                    onClick={() => {
                      cancel_request(info.book.book_borrow[0].borrow_id);
                    }}
                  >
                    On Hold
                  </span>
                )}
              {normal_user &&
                info.book &&
                info.book.book_borrow.length != 0 &&
                info.book.book_borrow[0].user_id != getUser().userID && (
                  <span className="btn btn-light disabled">Not Available</span>
                )}
              {info.user &&
                info.user.user_borrow.length == info.user.borrowCount && (
                  <span className="btn btn-light disabled">
                    You've reached borrowing limit
                  </span>
                )}
            </section>
          </section>
          <section className="card-cover">
            <img src={`${SERVER_DOMAIN}/${info.book.photo}`} alt="book_cover" />
          </section>
        </section>
      )}
      {info.loading && <Spinner />}
      {info.err && (
        <ErrorModal
          message={info.err}
          closeModal={() => setInfo({ ...info, err: null })}
        />
      )}
    </section>
  );
};

export default BookDetail;
