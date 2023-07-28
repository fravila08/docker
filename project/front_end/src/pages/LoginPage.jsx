import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(userContext)

  const logIn = async(e) => {
    e.preventDefault();
    let response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
      email: userName,
      password: password,
    },
    {
      withCredentials:true
    });
    console.log(response)
    // let token = response.data.token
    let user = response.data
    // localStorage.setItem("token", token)
    setUser(user)
  };

  return (
    <form onSubmit={(e) => logIn(e)}>
      <h5>Log In</h5>
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
