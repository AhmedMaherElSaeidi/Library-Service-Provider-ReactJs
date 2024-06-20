import "./BookModel.css";
import { Link } from "react-router-dom";
import { getUser, isAuth } from "../../core/authenication";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import { VscOpenPreview } from "react-icons/vsc";

const BookModel = (attributes) => {
  const librarian_user = isAuth() && getUser().type == "librarian";

  return (
    <section className="book-model">
      <img src={attributes.cover} alt="Book_Cover" />
      <section className="model-cover text-white">
        <h5 className="mb-1">{attributes.title}</h5>
        <p className="model-text">{attributes.author}</p>
        <p className="model-text">{attributes.category}</p>
      </section>
      <section className="model-content">
        <section className="model-content-heading text-lightblue">
          <h5 className="model-title mb-0">ISBN {attributes.isbn}</h5>
          <p className="model-text">Rack {attributes.rackNumber}</p>
        </section>
        <section className="model-content-icons text-lightblue">
          <Link
            className="text-lightblue content-icon"
            to={"/pages/home/book/" + attributes.bookID}
          >
            <VscOpenPreview className="fs-2" title="View book" />
          </Link>
        </section>
      </section>
      {librarian_user && (
        <>
          <span className="edit-icon">
            <Link
              className="text-lightblue"
              to={"/pages/options/update-book/" + attributes.bookID}
            >
              <FiEdit />
            </Link>
          </span>
          <span className="trash-icon text-lightblue">
            <BsTrashFill onClick={() => attributes.remove(attributes.bookID)} />
          </span>
        </>
      )}
    </section>
  );
};

export default BookModel;
