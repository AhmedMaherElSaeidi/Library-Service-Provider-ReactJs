import "./CartPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUser, getToken } from "../../core/authenication";
import { SERVER_DOMAIN, SERVER_URL } from "../../core/globals";
import Spinner from "../../components/Spinner/Spinner";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import BookCartRow from "../../components/BookCartRow/BookCartRow";

const CartPage = () => {
  const [info, setInfo] = useState({
    loading: true,
    borrows: [],
    err: null,
    changes: null,
    message: null,
  });

  const remove_book = (id) => {
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
    axios
      .get(SERVER_URL + "borrows/join/user-book", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setInfo({ ...info, borrows: res.data, loading: false });
      })
      .catch((err) => {
        setInfo({ ...info, err: err.response.data.message, loading: false });
      });
  }, [info.changes]);

  return (
    <section className="container-fluid cart-page">
      <section className="books-table">
        <section className="books-table-header text-lightblue mb-2">
          <p>Book</p>
          <p>Details</p>
        </section>
        {info.borrows
          .filter((obj) => obj.user_borrow.user_id == getUser().userID)
          .map((obj, index) => {
            return (
              <BookCartRow
                key={index}
                bookID={obj.borrow_id}
                isbn={obj.book_borrow.ISBN}
                title={obj.book_borrow.title}
                description={obj.book_borrow.description}
                author={obj.book_borrow.author}
                rackNumber={obj.book_borrow.rack_number}
                cover={`${SERVER_DOMAIN}/${obj.book_borrow.photo}`}
                category={obj.book_borrow.category_book.category}
                remove={(id) => remove_book(id)}
              />
            );
          })}
      </section>
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

export default CartPage;
