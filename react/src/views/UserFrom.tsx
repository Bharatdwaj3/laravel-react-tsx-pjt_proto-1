import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axiosClient from "../axios-client.ts";
import { useStateContext } from "../context/ContextProvider.tsx";

interface User {
  id: number | null;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface Errors {
  [key: string]: string[];
}

export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<User>({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Errors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <>
      {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              name="password_confirmation"
              type="password"
              onChange={handleChange}
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
