import React from 'react';
import style from "./Login.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  React.useEffect(() => {
    if (isAuthenticated && user) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        icon: 'success',
        title: `Inicio de sesión exitoso: ${user.name}`,
        timerProgressBar: true,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <button className={style.LoginButton} onClick={handleLogin}>Ingresar</button>
  );
}

export default LoginButton;
