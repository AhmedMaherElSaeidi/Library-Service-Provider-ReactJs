import "./UsersAccount.css";
import { MdChangeCircle, MdPersonRemove } from "react-icons/md";
import { FcAcceptDatabase, FcDeleteDatabase } from "react-icons/fc";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../core/globals";
import { getToken, getUser, removeToken } from "../../core/authenication";
import Spinner from "../Spinner/Spinner";
import ErrorModal from "../ErrorModal/ErrorModal";
import FormSearch from "../Form/FormSearch/FormSearch";

const UsersAccount = () => {
  const [searchValue, setSearchValue] = useState("");
  const [usersData, setUsersData] = useState({
    users: [],
    err: null,
    loading: true,
    changes: true,
  });
  const navigate = useNavigate();
  const targeted_users = () => {
    if (searchValue != "")
      return usersData.users.filter(
        (value) =>
          value.status.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
          value.gender_user.gender
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );

    return usersData.users;
  };
  const updateUser = (user_data, key, value) => {
    const user = {};
    user[key] = value;
    setUsersData({ ...usersData, loading: true });

    axios
      .put(SERVER_URL + `users/${user_data.user_id}`, user, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setUsersData({
          ...usersData,
          loading: false,
          changes: !usersData.changes,
        });

        alert(`${user_data.username} has been modified.`);
      })
      .catch((err) => {
        setUsersData({
          ...usersData,
          err: err.response.data.message,
          loading: false,
        });
      });

    if (user_data.user_id == getUser().userID) {
      removeToken();
      navigate("/authenication/login");
    }
  };
  const removeUser = (user_data) => {
    const confirm = prompt(
      `Type 'yes' to proceed?...\nRemoving ${user_data.username}'s account...`
    );
    if (confirm !== "yes") return;

    setUsersData({ ...usersData, loading: true });
    axios
      .delete(SERVER_URL + `users/${user_data.user_id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setUsersData({
          ...usersData,
          loading: false,
          changes: !usersData.changes,
        });
      })
      .catch((err) => {
        setUsersData({
          ...usersData,
          err: err.response.data.message,
          loading: false,
        });
      });

    if (user_data.user_id == getUser().userID) {
      removeToken();
      navigate("/authenication/login");
    }
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "users/join/user-gender", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setUsersData({ ...usersData, users: res.data, loading: false });
      })
      .catch((err) => {
        setUsersData({
          ...usersData,
          err: err.response.data.message,
          loading: false,
        });
      });
  }, [usersData.changes]);

  return (
    <>
      <section className="users-account">
        <FormSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        {usersData.users &&
          targeted_users().map((obj, index) => {
            const next_type = obj.type == "normal" ? "librarian" : "normal";
            const next_status = obj.status == "active" ? "inactive" : "active";

            return (
              <section className="user-account" key={index}>
                <p className="mb-1">
                  <span className="fw-bold title">Account status: </span>
                  <span className="value">{obj.status}</span>
                </p>
                <p className="mb-1">
                  <span className="fw-bold title">Account type: </span>
                  <span className="value">{obj.type}</span>
                </p>
                <p className="mb-1">
                  <span className="fw-bold title">Username: </span>
                  <span className="value">{obj.username}</span>
                </p>
                <p className="mb-1">
                  <span className="fw-bold title">Gender: </span>
                  <span className="value">{obj.gender_user.gender}</span>
                </p>
                <p className="mb-1">
                  <span className="fw-bold title">Phone Number: </span>
                  <span className="value">{obj.phone}</span>
                </p>
                <p className="mb-1">
                  <span className="fw-bold title">E-Mail: </span>
                  <span className="value">{obj.email}</span>
                </p>
                <section className="user-account-options">
                  <span onClick={() => removeUser(obj)} title="Remove account">
                    <MdPersonRemove />
                  </span>
                  <span
                    onClick={() => updateUser(obj, "type", next_type)}
                    title="Role promotion"
                  >
                    <MdChangeCircle />
                  </span>
                  <span
                    onClick={() => updateUser(obj, "status", next_status)}
                    title={
                      next_status == "active"
                        ? "Restrict account"
                        : "Unrestrict account"
                    }
                  >
                    {next_status == "active" ? (
                      <FcAcceptDatabase />
                    ) : (
                      <FcDeleteDatabase />
                    )}
                  </span>
                </section>
              </section>
            );
          })}
      </section>
      {usersData.loading && <Spinner />}
      {usersData.err && (
        <ErrorModal
          message={usersData.err}
          closeModal={() => setUsersData({ ...usersData, err: null })}
        />
      )}
    </>
  );
};

export default UsersAccount;
