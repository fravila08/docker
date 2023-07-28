import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { createContext } from "react";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <>
      <header>
        <nav>
          <Link to="/">Register</Link>
          <Link to="/login">Log In</Link>
          <Link to="/home">Home</Link>
        </nav>
      </header>
      <userContext.Provider value={{ user, setUser }}>
        <Outlet />
      </userContext.Provider>
    </>
  );
}

export default App;
