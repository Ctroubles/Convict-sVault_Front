import style from "./Home.module.css"
import SliderCategory from "./components/SilderCategory/SliderCategory";


const Home = ()=>{

   

    return(
        <div>
            <section id={style.body}>
                <div style={{maxWidth:"1350px", width:"100%", padding:"0 20px"}}>
                    <label htmlFor="">
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
                            <SliderCategory category={"Servicios"}/>
                        </div>
                    </label>
                </div>
            </section>
        </div>
    )
};

export default Home;