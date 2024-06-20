import "./OptionsPage.css";
import { Link, Outlet } from "react-router-dom";

const OptionsPage = () => {
  return (
    <section className="options-page">
      <section className="options-page-body">
        <Outlet />
      </section>
      <aside className="options-aside-bar">
        <ul>
          <Link to="/pages/options/create-book">
            <li>Add Book</li>
          </Link>
          <Link to="/pages/options/user-accounts">
            <li>Users Account</li>
          </Link>
          <Link to="/pages/options/borrow-requests">
            <li>Borrow Requests</li>
          </Link>
        </ul>
      </aside>
    </section>
  );
};

export default OptionsPage;
