import style from "./Landing.module.css";
import {Link} from "react-router-dom"
import LoginButton from "../home/components/Login/LoginButton";
const Landing = () =>{

    return(
        <div className={style.container}>
            <Link to={"/home"} >
            <button className={style.button}>Ir a la tienda</button>
            </Link>
            <LoginButton/>
        </div>
    )
};

export default Landing;