import React from 'react';
import style from "./Login.module.css"
import { useAuth0 } from "@auth0/auth0-react";
function LoginButton() {
const { loginWithRedirect } = useAuth0();
  return (
    <button className={style.LoginButton} onClick={()=>loginWithRedirect()}>Ingresar</button>
  )
}

export default LoginButton