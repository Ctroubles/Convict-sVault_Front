// import React from 'react';
// import style from "./Login.module.css";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';

// function LoginButton() {
//   console.log("hola")
//   const { loginWithRedirect, isAuthenticated, user } = useAuth0();
//   const handleLogin = async () => {
//     await loginWithRedirect();
    
//     if (isAuthenticated) {
//       console.log("hola2")
//       try {
//         setTimeout(async () => {
//           const userData = {
//             name: user.name,
//             email: user.email,
//           };
//           console.log(userData);
        
//           await axios.post('http://localhost:3001/users/create-user', userData);
//         }, 1000);
//       } catch (error) {
//         console.error('Error al guardar los datos:', error);
//       }
//     }
//   };
//   return (
//     <button className={style.LoginButton} onClick={handleLogin}>Ingresar</button>
//   );
// }

// export default LoginButton;


import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Login.module.css"

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return(
    <button 
    className={style.logging} 
    onClick={() => loginWithRedirect()}
    >INICIAR SESIÓN</button>)
}

export default LoginButton