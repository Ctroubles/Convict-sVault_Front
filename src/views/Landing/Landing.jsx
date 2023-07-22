import React from 'react';
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import LoginButton from "./Login/LoginButton";
import LogoutButton from "./Logout/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import logo3 from "../../assets/logoAzul2-removebg-preview.png";

const Landing = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={style.container}>
      <div style={{width: "100%"}}>
        <div id={style.imgContainer}>
          <img src={logo3} alt='Super Reo Y+' />
        </div>
        <div id={style.containerButtons}>
          <div>
            <Link style={{width: "100%", display:"block"}} to={"/home"}>
              <button className={style.button}>VER TIENDA</button>
            </Link>
          </div>
          <div>
            {
              isAuthenticated ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )
            }
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Landing;
