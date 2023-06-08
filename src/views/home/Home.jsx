import Footer from "./components/Footer/Footer";
import Header from "./components/Header/header";
import homeIcon from "./assets/home_icon.svg"
import style from "./Home.module.css"
import FilterSideBar from "./components/FilterSideBar/FilterSideBar";
import { useEffect, useState } from "react";
import axios from "axios"
import Card from "./components/Card/Card";
import SliderCategory from "./components/SilderCategory/SliderCategory";


const Home = ()=>{

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);

    const getProducts = async() =>{
        try {
            const {data} = await axios.get("http://localhost:3001/products");
            setProducts(data)
        } catch (error) {
            console.log(error);
            alert("Error al traer Data, checar en consola")
        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    const handleSearch = (searchTerm) => {
      if (searchTerm === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    };

    return(
        <div>
            <Header/>
            <section id={style.body}>
                <div style={{maxWidth:"1350px", width:"100%", padding:"0 20px"}}>
                    <label>
                        {/* <div>
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
                            <div style={{display:"flex" ,justifyContent:"space-between", alignItems:"stretch", width:"100%"}}>
                                <div style={{paddingRight:"30px"}}>
                                    <FilterSideBar/>
                                </div>
                                <div style={{width:"100%",}}>
                                    <div id={style.cardsContaier}>
                                        {products.map(e=>(
                                            <Card key={e._id} brand={e.brand} category={e.category} image={e.image} price ={e.price} name={e.name} id={e._id}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <SliderCategory category={"Equipaje"}/>
                            <SliderCategory category={"Belleza"}/>
                            <SliderCategory category={"Joyeria"}/>
                            <SliderCategory category={"Tecnologia"}/>
                            <SliderCategory category={"Calzado"}/>
                            <SliderCategory category={"Juguetes"}/>
                            <SliderCategory category={"Muebles"}/>
                            <SliderCategory category={"Ropa"}/>
                            <SliderCategory category={"Mascotas"}/>
                            <SliderCategory category={"Turismo"}/>
                            <SliderCategory category={"Artesanias"}/>
                            <SliderCategory category={"Agropecuario"}/>
                        </div>
                    </label>
                </div>
            </section>
            <Footer/>
        </div>
    )
};

export default Home;