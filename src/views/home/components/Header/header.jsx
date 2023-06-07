import style from "./Header.module.css"
import shopping_cart from "../../../../assets/icons/shopping_cart.svg"
import lines_menu from "../../../../assets/icons/lines_menu.svg"
import SearchBar from "../../Searchbar/Searchbar";
import NavBar from "../../../../admin/Dashboard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = () =>{
    return(
        <div>
                <div>
                    <div id={style.top}>
                        <div id={style.logoSection}>
                            <h1>SUPER REO Y+</h1>
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

                            {/* puede haber cambios en este admin */}
                            <Link to={"/dashboard"}>
                        <button>dashboard</button>
                            </Link>

                        </div>
                    </div>
                    <div style={{backgroundColor:"#009fe3", display:"flex", padding:"0 16px", justifyContent:"center"}}>
                        <div style={{display:"flex", padding:"0 16px", justifyContent:"space-between", width:"100%", maxWidth:"1500px"}}>
                            <div id={style.buttonMenu}>
                                <div>
                                    <label>
                                        <img src={lines_menu} alt="Menu" />
                                    </label>
                                    <label>
                                        <p>Todas las categorías</p>
                                    </label>
                                </div>
                            </div>
                            <nav id={style.navBar}>
                                <li>Ropa</li>    
                                <li>Calzado</li>    
                                <li>Joyería</li>    
                                <li>Muebles</li>    
                                <li>Jeguetería</li>    
                                <li>belleza</li>    
                                <li>Equipaje</li>    
                            </nav>  
                        </div>
                    </div>
                </div>
            </div>
    )
};


export default Header;