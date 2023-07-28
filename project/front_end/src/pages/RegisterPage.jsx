import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { userContext } from "../App";

export const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(userContext)

  const signUp = async(e) => {
    e.preventDefault();
    let response = await axios.post("http://127.0.0.1:8000/api/users/register/", {
      email: userName,
      password: password,
    });
    let user = response.data.user
    let token = response.data.token
    localStorage.setItem("token", token)
    setUser(user)
  };

  return (
    <form onSubmit={(e) => signUp(e)}>
      <h5>Sign Up</h5>
      <input
        type="email"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};
