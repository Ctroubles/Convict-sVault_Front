import React from 'react';
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import LoginButton from "./Login/LoginButton";
import LogoutButton from "./Logout/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/logo_superReoprincipal-removebg-preview.png"
import logo2 from "../../assets/LogoAzul-removebg-preview.png"
import logo3 from "../../assets/logoAzul2-removebg-preview.png"
import logo4 from "../../assets/logoAmarillo2-removebg-preview.png"

const Landing = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={style.container}>
      {/* <img src={logo} alt='Super Reo Y+' width="600px"/> */}
      {/* <img src={logo2} alt='Super Reo Y+' width="400px"/> */}
      <img src={logo3} alt='Super Reo Y+' width="400px"/>
      {/* <img src={logo4} alt='Super Reo Y+' width="400px"/> */}
      <Link to={"/home"}>
        <button className={style.button}>Ir a la tienda</button>
      </Link>
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Landing;
