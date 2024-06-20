import { BsTrashFill } from "react-icons/bs";
import "./BookCart.css";

const BookCart = ({ isbn, bookID, title, author, cover, remove }) => {
  return (
    <section className="book-cart">
      <img src={cover} alt="Book_Cover" />
      <section className="cart-cover text-lightblue">
        <h5 className="mb-1">{title}</h5>
        <h6 className="cart-title mb-1">{author}</h6>
      </section>
      <section className="cart-content">
        <section>
          <span
            className="trash-icon text-lightblue"
            title="Return book"
            onClick={() => remove(bookID)}
          >
            <BsTrashFill />
          </span>
        </section>
      </section>
    </section>
  );
};

export default BookCart;
