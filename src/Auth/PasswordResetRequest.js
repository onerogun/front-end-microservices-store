import { useState, useRef, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const PasswordResetRequest = () => {
  const [email, setEmail] = useState();
  const server = useContext(ServerContext);
  const showErr = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email);

    axios
      .get(`${server}/auth/resetPassword`, {
        params: {
          email: email,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function validateForm() {
    return email != null && email.indexOf("@") > 0;
  }

  return (
    <div className="container mt-5 ">
      <div ref={showErr} className="visually-hidden" role="alert">
        Wrong username or password!
      </div>
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-md-4 mx-auto">
            <label className="form-label" for="email">
              Email
            </label>
            <input
              autoFocus
              id="email"
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-md-4 mx-auto mt-2 float-star">
            <button
              className="btn btn-primary px-5"
              type="submit"
              disabled={!validateForm()}
            >
              Submit
            </button>

            <Link
              className="btn btn-primary mr-2 float-end px-5"
              to={`/login`}
              role="button"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
