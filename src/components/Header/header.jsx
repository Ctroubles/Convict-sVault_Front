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
import logo from "../../assets/logorecortadoooooo (1).png";
import { useAuth0 } from "@auth0/auth0-react";
import {useSelector} from "react-redux"
import Cart from "../cart/Cart";
import { useRef } from "react";



const Header = ({user, viewportWidth}) =>{

    const {cart} = useSelector(state => state)
    const {loginWithRedirect, logout} = useAuth0()
    const  navRef = useRef(null)

    const [itemsCart, setItemsCart] = useState(0)
    const {pathname} = useLocation()
    const [category, setCategory] = useState(null)
    const [cartStatus, setCartStatus] = useState(false)
    const [navStatus, setNavStatus] = useState(false)

    useEffect(()=>{
        const arrurl = pathname.split("/");
        const category = arrurl[arrurl.length-1];
        setCategory(category);
        if (navStatus) {
            setNavStatus(false)
        }
    },[pathname])

    useEffect(()=>{
        let quantity = 0;
        cart.map(e=>quantity=quantity+e[Object.keys(e)[0]])
        setItemsCart(quantity)
    },[cart])

    useEffect(()=>{
        if (viewportWidth <= 1400 && navRef.current) {
            if (navStatus ) {
                document.body.style.overflow = "hidden";
                navRef.current.classList.remove(style.nonDisplay);
            }else{
                setTimeout(() => {
                    navRef.current.classList.add(style.nonDisplay);
                    document.body.style.overflow = "visible";
                }, 150);
            }
        }else{
            navRef.current.classList.remove(style.nonDisplay);
            document.body.style.overflow = "visible";
        }
    },[navStatus])

    useEffect(()=>{
        if (viewportWidth > 1400 && navRef.current) {
            navRef.current.classList.remove(style.nonDisplay);
        }else if(viewportWidth <= 1400 || !navStatus){
            navRef.current.classList.add(style.nonDisplay);
            setNavStatus(false)
        }
    },[viewportWidth])


    useEffect(()=>{
        const rootElement = document.getElementById("root");
        if (cartStatus && viewportWidth > 960) {
            rootElement.style.height = "100vh"    
            rootElement.style.overflow = "hidden";
        }
        else { 
            rootElement.style.overflow = "visible";
            rootElement.style.height = "auto"    
        }
        return () => { 
            rootElement.style.overflow = "visible";
            rootElement.style.height = "auto"    
        }
    },[cartStatus, viewportWidth])

    const closeNavSide = (e) =>{
        if (e.target.id === style.navContainer || e.target.id === style.buttonNav) {
            setNavStatus(false)
        }
    }

    return(
        <div>
            <section>
                <div>
                        <div id={style.top}>
                            <div id={style.logoSection}>
                                <img src={logo} alt="" width={"30px"}/>
                                <h1>
                                 Super Reo Y+
                                </h1>
                            </div>
                            <div id={style.rightOptions}>
                                <div>
                                    <label id={style.account}>
                                        <button></button>
                                        <div>
                                            <span id={style.hola}>Hola</span>
                                            {
                                                user ? (
                                                    <div style={{position:"relative"}} >
                                                        <p
                                                         style={{
                                                            cursor:"pointer",
                                                        }}
                                                        id={style.opener}
                                                        >{user.name}</p>
                                            <div id={style.menu_desplegable}>
                                                <div id={style.email}>
                                                    <label>
                                                        <span>{user.email}</span>
                                                    </label>
                                                </div>
                                                {
                                                    user.isAdmin?(
                                                        <Link className={style.options} to={"/dashboard"}>
                                                            <label>
                                                                <RiShieldUserFill className={style.dashboardIcon} />
                                                                <span>Admin dashboard</span>  
                                                            </label>
                                                        </Link>
                                                    ) : null
                                                }                                                                 
                                                <Link className={style.options} to="/account" >
                                                    <label>
                                                        <span>Mi perfil</span>
                                                    </label>
                                                </Link>            
                                                <div className={style.options} onClick={()=>logout({ returnTo: window.location.origin })} style={{paddingBottom:"5px", color:" #fa0202 "}}>
                                                    <label>
                                                        <span>Cerrar sesión</span>
                                                    </label>
                                                </div>
                                            </div>
                                                    </div>
                                                ) : (
                                                    <p onClick={()=>loginWithRedirect()}
                                                    style={{
                                                        cursor:"pointer",
                                                    }}
                                                    className={style.underLined}
                                                     >Iniciar sesión</p>                                                )
                                            }
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <div id={style.shopping_cart}>
                                        <label>
                                            <img src={shopping_cart} onClick={()=>setCartStatus(!cartStatus)} alt="Carrito de compras" />
                                        </label>
                                        <span>{itemsCart}</span>
                                    </div>
                                </div>                   
                            </div>
                        </div>
                        <div style={{backgroundColor:"#009fe3", display:"flex", justifyContent:"center"}}>
                                <div id={style.buttonMenuPhone} onClick={()=>setNavStatus(!navStatus)}>
                                    <div>
                                            <label>
                                                <img src={lines_menu} alt="Menu" />
                                            </label>
                                            <label>
                                                <p>Categorías</p>
                                            </label>
                                    </div>
                                </div>
                            <div id={style.navContainer} ref={navRef} className={!navStatus?style.desactive:style.active} onClick={(e)=>closeNavSide(e)}>
                                <div>
                                    <div id={style.buttonMenu} >
                                        <div>
                                            <Link to={"/home"} className={style.buttonNav}>
                                                <label>
                                                    <img src={lines_menu} alt="Menu" />
                                                </label>
                                                <label>
                                                    <p>Todas las categorías</p>
                                                </label>
                                            </Link>
                                        </div>
                                        <div id={style.quitButton} onClick={()=>setNavStatus(false)}>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                    <nav id={style.navBar}>
                                        <Link to={"/category/ropa"} className={style.buttonNav} style={category==="ropa"?{backgroundColor:"#0e628b"}:undefined}><li >Ropa</li></Link>    
                                        <Link to={"/category/calzado"} className={style.buttonNav} style={category==="calzado"?{backgroundColor:"#0e628b"}:undefined}><li >Calzado</li></Link>    
                                        <Link to={"/category/joyeria"} className={style.buttonNav} style={category==="joyeria"?{backgroundColor:"#0e628b"}:undefined}><li >Joyería</li></Link>    
                                        <Link to={"/category/muebles"} className={style.buttonNav} style={category==="muebles"?{backgroundColor:"#0e628b"}:undefined}><li >Muebles</li></Link>    
                                        <Link to={"/category/juguetes"} className={style.buttonNav} style={category==="juguetes"?{backgroundColor:"#0e628b"}:undefined}><li >Juguetería</li></Link>    
                                        <Link to={"/category/belleza"} className={style.buttonNav} style={category==="belleza"?{backgroundColor:"#0e628b"}:undefined}><li >Belleza</li></Link>    
                                        <Link to={"/category/equipaje"} className={style.buttonNav} style={category==="equipaje"?{backgroundColor:"#0e628b"}:undefined}><li >Equipaje</li></Link>      
                                        <Link to={"/category/mascotas"} className={style.buttonNav} style={category==="mascotas"?{backgroundColor:"#0e628b"}:undefined}><li >Mascotas</li></Link>      
                                        <Link to={"/category/turismo"} className={style.buttonNav} style={category==="turismo"?{backgroundColor:"#0e628b"}:undefined}><li >Turismo</li></Link>      
                                        <Link to={"/category/artesania"} className={style.buttonNav} style={category==="artesania"?{backgroundColor:"#0e628b"}:undefined}><li >Artesania</li></Link>      
                                        <Link to={"/category/agropecuario"} className={style.buttonNav} style={category==="agropecuario"?{backgroundColor:"#0e628b"}:undefined}><li >Agropecuario</li></Link>      
                                        <Link to={"/category/servicios"} className={style.buttonNav} style={category==="servicios"?{backgroundColor:"#0e628b"}:undefined}><li >Servicios</li></Link>      
                                    </nav>  
                                </div>                               
                            </div>
                        </div>
                    </div>
            </section>
            {cartStatus?
            <Cart setCartStatus={setCartStatus}/>:null}
        </div>
    )
};


export default Header;