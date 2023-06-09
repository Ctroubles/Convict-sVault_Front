import style from "./ByCategory.module.css";
import FilterSideBar from "./components/FilterSideBar/FilterSideBar";
import { useEffect, useState } from "react";
import axios from "axios"
import Card from "../../components/Card/Card";
import homeIcon from "./assets/home_icon.svg";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../util";


const ByCategory = () =>{

    const {cat} = useParams()

    const [products, setProducts] = useState([])

    const getProducts = async() =>{
        try {
            // const {data} = await axios.get("http://localhost:3001/products");
            const {data} = await axios.get(`http://localhost:3001/products/category/${cat}`);
            setProducts(data)
        } catch (error) {
            console.log(error);
            alert("Error al traer Data, checar en consola")
        }
    }

    useEffect(()=>{
        setProducts([])
        getProducts()
    },[cat])

    return(
        <div id={style.ByCategory}>
            <section>
                <div style={{maxWidth:"1300px", width:"100%",}}>
                    <div style={{display:"flex", alignItems:"end", padding:"0px 0 25px 0", }}>
                        <div style={{width:"28px", height:"28px",}}>
                            <img src={homeIcon} alt="Home" style={{width:"28px", height:"28px",}}/>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <div style={{fontWeight:"400", margin:"0 9px 0 9px", fontSize:"20px"}}>
                                {">"}
                            </div>
                            <span style={{fontSize:"15px", color:"rgb(37, 44, 59)"}}>{capitalizeFirstLetter(cat)}</span>
                        </div>
                    </div>
                    <div style={{display:"flex" ,justifyContent:"space-between", alignItems:"stretch", width:"100%",}}>
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
                </div>
            </section>
        </div>
    )
};

export default ByCategory;