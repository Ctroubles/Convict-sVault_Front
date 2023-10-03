import { useEffect } from "react";
import style from "./Home.module.css"
import SliderCategory from "./components/SilderCategory/SliderCategory";


const Home = ({viewportWidth})=>{
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    return(
        <div>
            <section id={style.body}>
                <div id={style.container} >
                    <label htmlFor="">
                        <div>
                            <SliderCategory viewportWidth={viewportWidth} category={"Belleza"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Joyeria"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Tecnologia"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Calzado"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Juguetes"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Muebles"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Ropa"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Artesanias"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Equipaje"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Agropecuario"}/>
                            <SliderCategory viewportWidth={viewportWidth} category={"Servicios"}/>
                        </div>
                    </label>
                </div>
            </section>
        </div>
    )
};

export default Home;