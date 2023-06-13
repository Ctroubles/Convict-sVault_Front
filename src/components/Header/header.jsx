import style from "./Header.module.css"
import shopping_cart from "../../assets/icons/shopping_cart.svg"
import lines_menu from "../../assets/icons/lines_menu.svg"
// import SearchBar from "../Searchbar/Searchbar";
// import NavBar from "../../admin/Dashboard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {useLocation} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { RiShieldUserFill } from "react-icons/ri"
// import logo from "../../assets/logoAzul2-removebg-preview.png";
// import logo2 from "../../assets/LogoAzul-removebg-preview.png"
import axios from "axios";

const Header = () =>{

    const {pathname} = useLocation()
    const [category, setCategory] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{
        const arrurl = pathname.split("/");
        const category = arrurl[arrurl.length-1];
        console.log(category);
        setCategory(category);
    },[pathname])
    // useEffect (() => {
    //   const fetchUserData  = async()=>{
    //     const response = await axios.get("http://localhost:3001/users/db")
    //     const currentUser = response.data;
    //     const isAdmin = currentUser.isAmin;
    //     setIsAdmin(isAdmin);
    //   }
    //   fetchUserData(true);
    //   }, []);
    return(
        <div>
            <section>
                <div>
                        <div id={style.top}>
                            <div id={style.logoSection}>
                                <h1>
                                 Super Reo Y+
                                </h1>
                            </div>
                            <div id={style.rightOptions}>
                                <div>
                                    <label id={style.account}>
                                        <button></button>
                                        <div>
                                            <span>Hola</span>
                                            <p>Mi cuenta</p>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <div id={style.shopping_cart}>
                                        <label>
                                            <img src={shopping_cart} alt="Carrito de compras" />
                                        </label>
                                        <span>0</span>
                                    </div>
                                </div>
                                {
                <Link to={"/dashboard"}>
                  <RiShieldUserFill className={style.dashboardIcon} />
                </Link>
              }
                            </div>
                        </div>
                        <div style={{backgroundColor:"#009fe3", display:"flex", padding:"0 16px", justifyContent:"center"}}>
                            <div style={{display:"flex", padding:"0 16px", justifyContent:"space-between", width:"100%", maxWidth:"1500px"}}>
                                <div id={style.buttonMenu}>
                                    <div>
                                        <Link to={"/home"}>
                                            <label>
                                                <img src={lines_menu} alt="Menu" />
                                            </label>
                                            <label>
                                                <p>Todas las categorías</p>
                                            </label>
                                        </Link>
                                    </div>
                                </div>
                                <nav id={style.navBar}>
                                    <Link to={"/category/ropa"} style={category==="ropa"?{backgroundColor:"#0e628b"}:undefined}><li >Ropa</li></Link>    
                                    <Link to={"/category/calzado"} style={category==="calzado"?{backgroundColor:"#0e628b"}:undefined}><li >Calzado</li></Link>    
                                    <Link to={"/category/joyeria"} style={category==="joyeria"?{backgroundColor:"#0e628b"}:undefined}><li >Joyería</li></Link>    
                                    <Link to={"/category/muebles"} style={category==="muebles"?{backgroundColor:"#0e628b"}:undefined}><li >Muebles</li></Link>    
                                    <Link to={"/category/juguetes"} style={category==="juguetes"?{backgroundColor:"#0e628b"}:undefined}><li >Jeguetería</li></Link>    
                                    <Link to={"/category/belleza"} style={category==="belleza"?{backgroundColor:"#0e628b"}:undefined}><li >Belleza</li></Link>    
                                    <Link to={"/category/equipaje"} style={category==="equipaje"?{backgroundColor:"#0e628b"}:undefined}><li >Equipaje</li></Link>      
                                </nav>  
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    )
};


export default Header;