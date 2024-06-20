import "./BooksPage.css";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getToken } from "../../core/authenication";
import Spinner from "../../components/Spinner/Spinner";
import BookModel from "../../components/BookModel/BookModel";
import InfoModal from "../../components/InfoModal/InfoModal";
import { SERVER_URL, SERVER_DOMAIN } from "../../core/globals";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import FormSearch from "../../components/Form/FormSearch/FormSearch";

const BooksPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [homeData, setHomeData] = useState({
    books: [],
    err: null,
    changes: null,
    message: null,
    loading: true,
  });
  const [searchParams] = useSearchParams();
  const targeted_books = () => {
    if (searchValue != "")
      return homeData.books.filter(
        (value) =>
          value.category_book.category
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          value.author.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.title.toLowerCase().includes(searchValue.toLowerCase())
      );

    return homeData.books;
  };
  const remove_book = (bookID) => {
    const confirm = prompt(
      `Type 'yes' to proceed?...\nRemoving book of ID: ${bookID}`
    );
    if (confirm !== "yes") return;

    setHomeData({ ...homeData, loading: true });
    axios
      .delete(SERVER_URL + `books/${bookID}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setHomeData({
          ...homeData,
          loading: false,
          changes: !homeData.changes,
          message: res.data.message[0].msg,
        });
      })
      .catch((err) => {
        setHomeData({
          ...homeData,
          err: err.response.data.message,
          loading: false,
        });
      });
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "books/join/book-category/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        const category = searchParams.get("category");

        if (!category) {
          setHomeData({
            ...homeData,
            books: res.data,
            loading: false,
          });
          return;
        }

        setHomeData({
          ...homeData,
          books: res.data.filter((value) => value.category_id == category),
          loading: false,
        });
      })
      .catch((err) => {
        setHomeData({
          ...homeData,
          err: err.response.data.message,
          loading: false,
        });
      });
  }, [homeData.changes, searchParams.get("category")]);

  return (
    <section className="books-page">
      <FormSearch className="book-search" searchValue={searchValue} setSearchValue={setSearchValue} />
      <section className="book-card-list">
        {targeted_books().map((obj, index) => {
          return (
            <BookModel
              key={index}
              isbn={obj.ISBN}
              title={obj.title}
              author={obj.author}
              bookID={obj.book_id}
              remove={remove_book}
              rackNumber={obj.rack_number}
              cover={`${SERVER_DOMAIN}/${obj.photo}`}
              category={obj.category_book.category}
            ></BookModel>
          );
        })}
      </section>
      {homeData.loading && <Spinner />}
      {homeData.message && (
        <InfoModal
          message={homeData.message}
          closeModal={() => setHomeData({ ...homeData, message: null })}
        />
      )}
      {homeData.err && (
        <ErrorModal
          message={homeData.err}
          closeModal={() => setHomeData({ ...homeData, err: null })}
        />
      )}
    </section>
  );
};

export default BooksPage;
