import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import promoImage1 from "../../assets/icons/Artboard 20 copy 2.png";
import bannerPpal from "../../assets/icons/bannerNuevo.png";
import SliderCategory from "./components/SilderCategory/SliderCategory";


const Home = ({ viewportWidth }) => {
        const promotions = [bannerPpal, promoImage1];
        const [currentPromo, setCurrentPromo] = useState(0);
      
        useEffect(() => {
          const timer = setInterval(() => {
            setCurrentPromo((currentPromo + 1) % promotions.length);
          }, 6000); // Cambia la imagen cada 5 segundos (5000 ms).
      
          return () => {
            clearInterval(timer);
          };
        }, [currentPromo, promotions.length]);
      
        const handleDotClick = (index) => {
          setCurrentPromo(index);
        };
      
        const handleNextClick = () => {
          setCurrentPromo((currentPromo + 1) % promotions.length);
        };
      
        const handlePrevClick = () => {
          setCurrentPromo((currentPromo - 1 + promotions.length) % promotions.length);
        };
    return(
        <div>
            <section id={style.body}>
                <div id={style.container} >
                    <div >
                        <div>
                <div className={style.bannerContainer}>
                <img
                src={promotions[currentPromo]}
                alt="Promoción"
                className={style.bannerImage}
                />
                <div className={style.navigation}>
                    <button onClick={handlePrevClick} className={style.prevButton}>
                    &lt;
                    </button>
                    <div className={style.dots}>
                    {promotions.map((_, index) => (
                        <span
                        key={index}
                        className={`${style.dot} ${index === currentPromo ? style.activeDot : ""}`}
                        onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                    </div>
                    <button onClick={handleNextClick} className={style.nextButton}>
                    &gt;
                    </button>
                </div>
                </div>
                </div>
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
                    </div>
            </section>
        </div>
    )
};

export default Home;