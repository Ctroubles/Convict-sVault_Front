import React from 'react';
import style from "./Login.module.css";
import { useAuth0 } from "@auth0/auth0-react";
// import Swal from 'sweetalert2';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <button className={style.LoginButton} onClick={handleLogin}>Ingresar</button>
  );
}

export default LoginButton;
