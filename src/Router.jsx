import { createHashRouter } from "react-router-dom";

import Layout from "./layout/Layout";
import AuthGuard from "./guards/AuthGuard";
import Login from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage/HomePage";
import BooksPage from "./pages/BooksPage/BooksPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Register from "./pages/RegisterPage/RegisterPage";
import OptionsPage from "./pages/OptionsPage/OptionsPage";
import NotFound from "./components/NotFound/NotFound";
import BookDetail from "./components/BookDetail/BookDetail";
import BookCreate from "./components/BookCreate/BookCreate";
import BookUpdate from "./components/BookUpdate/BookUpdate";
import UsersAccount from "./components/UsersAccount/UsersAccount";
import BorrowRequests from "./components/BorrowRequests/BorrowRequests";
import LoggedInGuard from "./guards/LoggedInGuard";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/pages/home",
        element: <HomePage />,
      },
      {
        path: "/pages/books",
        element: <BooksPage />,
      },
      {
        element: <LoggedInGuard />,
        children: [
          {
            path: "/pages/home/book/:id",
            element: <BookDetail />,
          },
        ],
      },
      {
        element: <AuthGuard role="normal" />,
        children: [
          {
            path: "/pages/cart",
            element: <CartPage />,
          },
        ],
      },
      {
        path: "/pages/about",
        element: <AboutPage />,
      },
      {
        element: <AuthGuard role="librarian" />,
        children: [
          {
            path: "/pages/options",
            element: <OptionsPage />,
            children: [
              {
                path: "/pages/options/",
                element: <BookCreate />,
              },
              {
                path: "/pages/options/create-book",
                element: <BookCreate />,
              },
              {
                path: "/pages/options/user-accounts",
                element: <UsersAccount />,
              },
              {
                path: "/pages/options/borrow-requests",
                element: <BorrowRequests />,
              },
              {
                path: "/pages/options/update-book/:id",
                element: <BookUpdate />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <AuthGuard auth={false} />,
    children: [
      {
        path: "/authenication/register",
        element: <Register />,
      },
      {
        path: "/authenication/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
