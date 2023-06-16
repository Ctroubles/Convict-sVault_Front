import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import style from "./LogoutButton.module.css";
import Swal from 'sweetalert2';
function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire('¡Sesión cerrada!', '', 'success');
      }
    });
  };

  return (
    <button className={style.LogoutButton}onClick={handleLogout}>Cerrar sesión</button>
  );
}

export default LogoutButton;
