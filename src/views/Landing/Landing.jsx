import React from 'react';
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import LoginButton from "./Login/LoginButton";
import LogoutButton from "./Logout/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={style.container}>
      <h1 >SUPER REO Y+</h1>
      <Link to={"/home"}>
        <button className={style.button}>Ir a la tienda</button>
      </Link>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Landing;
