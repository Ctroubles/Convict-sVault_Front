import style from "./Landing.module.css";
import {Link} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
const Landing = () =>{
    const { loginWithRedirect } = useAuth0();
    return(
        <div className={style.container}>
            <Link to={"/home"} >
            <button className={style.button}>Ir a la tienda</button>
            </Link>
            <button className={style.button} onClick={()=>loginWithRedirect()}>Ingresar</button>
        </div>
    )
};

export default Landing;