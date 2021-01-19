import { useState, useRef, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

export const PasswordReset = (props) => {
  const server = useContext(ServerContext);
  const [password, setPassword] = useState("newpasss");

  useEffect(() => {
    axios
      .post(
        `${server}/auth/resetPasswordByLink/${props.match.params.uuid}`,
        password,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [password]);

  return <p>resetting</p>;
};
