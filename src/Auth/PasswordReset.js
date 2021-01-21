import { useState, useRef, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

export const PasswordReset = (props) => {
  const server = useContext(ServerContext);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [linkValid, setLinkValid] = useState(false);
  const showErr = useRef();
  useEffect(() => {
    axios
      .get(
        `${server}/auth/passwordReset/checkLinkValidity/${props.match.params.uuid}`
      )
      .then((res) => {
        console.log(res);
        setLinkValid(true);
      })
      .catch((err) => {
        console.log(err);
        setLinkValid(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${server}/auth/resetPasswordByLink/${props.match.params.uuid}`,
        newPassword,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => console.log("reset successful! " + res.data))
      .catch((err) => console.log("Reset fail!" + err));
  };

  if (!linkValid) {
    return <p>Link invalid!</p>;
  }

  function validateForm() {
    if (showErr.current) {
      if (newPassword.length < 6) {
        showErr.current.className =
          "col-5 alert alert-danger mx-auto fw-normal fs-3 text-dark text-center";
      } else {
        showErr.current.className = "visually-hidden";
      }
    }
    return newPassword.length > 5 && newPassword === newPasswordConfirm;
  }
  return (
    <div className="container mt-5 ">
      <div ref={showErr} className="visually-hidden" role="alert">
        Password must be 6 caharacters or longer!
      </div>
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-md-4 mx-auto">
            <label className="form-label" for="passw">
              Enter new password:
            </label>
            <input
              autoFocus
              id="passw"
              className="form-control"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mx-auto">
            <label className="form-label" for="passwd">
              Enter password again:
            </label>
            <input
              id="passwd"
              className="form-control"
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
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
          </div>
        </div>
      </form>
    </div>
  );
};
