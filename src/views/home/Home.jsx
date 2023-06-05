import Footer from "./components/Footer/Footer";
import Header from "./components/Header/header";
import homeIcon from "./assets/home_icon.svg"
import style from "./Home.module.css"
import FilterSideBar from "./components/FilterSideBar/FilterSideBar";
import { useEffect, useState } from "react";
import axios from "axios"
import Card from "./components/Card/Card";


const Home = ()=>{

    const [products, setProducts] = useState([])

    const getProducts = async() =>{
        try {
            const {data} = await axios.get("http://localhost:3001/products");
            console.log(data);
            setProducts(data)
        } catch (error) {
            console.log(console.error);
            alert("Error al traer Data, checar en consola")
        }
    }

    useEffect(()=>{
        getProducts()
    },[])


    return(
        <div>
            <Header/>
            <section id={style.body}>
                <div style={{maxWidth:"1250px", width:"100%", padding:"0 20px"}}>
                    <label>
                        <div style={{display:"flex", alignItems:"center", padding:"20px 0 15px 0"}}>
                            <div style={{width:"26px", height:"26px",}}>
                                <img src={homeIcon} alt="Home" style={{width:"26px", height:"26px",}}/>
                            </div>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <div style={{fontWeight:"500", margin:"0 9px 0 9px", fontSize:"17px"}}>
                                    {">"}
                                </div>
                                <span style={{fontSize:"13px", color:"rgb(37, 44, 59)"}}>Calzado</span>
                            </div>
                        </div>
                        <div style={{display:"flex" ,justifyContent:"start",}}>
                            <div style={{paddingRight:"30px"}}>
                                <FilterSideBar/>
                            </div>
                            <div>
                                <div id={style.cardsContaier}>
                                    {products.map(e=>(
                                        <Card key={e._id} brand={e.brand} category={e.category} image={e.image} price ={e.price} name={e.name} id={e._id}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
            </section>
            <Footer/>
        </div>
    )
};

export default Home;