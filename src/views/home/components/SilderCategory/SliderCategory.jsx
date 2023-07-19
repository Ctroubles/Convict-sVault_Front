import style from "./SliderCategory.module.css"
import icon from "./assets/category_icons/icon_mu.png";
import promocional from "./assets/imagenes_promocional/imagen_temporal.jpg";
import { useEffect, useState } from "react";
import axios from "axios"
import OtherCard from "./components/OtherCard/OtherCard";
import arrow from "../../../../assets/icons/arrow_icon.svg"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Url_deploy_back from "../../../../util/deploy_back";



const SliderCategory = ({category, viewportWidth}) =>{

    const [products, setProducts] = useState([])
    const [position, setPositon] = useState(-1)
    const [sliderStyle, setSliderStyle] = useState({})

    const getProducts = async() =>{
        try {
            const {data} = await axios.get(`${Url_deploy_back}/products/category/${category}`);
            const arrSlider = data.filter(e => Number(e.stock ) > 0 && e.isActive);
            for (let i = 0; i < 4; i++) {
                arrSlider.push(arrSlider[i]);
            }
            setSliderStyle({
                transition: `transform 300ms ease`,
            })
            setProducts(arrSlider);
        } catch (error) {
            console.log(error);
            alert(`Error al traer Data en la categoría ${category}, checar en consola para más información.`)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])


    const [canCall, setCanCall] = useState(true);

    const forwardHandler = () => {
      if (!canCall) return;
      setSliderStyle({
        transition: `transform 300ms ease`,
      });
      setPositon(position - 1);
      setCanCall(false);
      setTimeout(() => {
        setCanCall(true);
      }, 300);
    };
  
    const backwardHandler = () => {
      if (!canCall) return;
      setSliderStyle({
        transition: `transform 300ms ease`,
      });
      setPositon(position + 1);
      setCanCall(false);
      setTimeout(() => {
        setCanCall(true);
      }, 300);
    };

    useEffect(()=>{
        if (!(position >= -products.length+4)) {
            setTimeout(()=>{
                setSliderStyle({
                    transition: `transform 0ms ease`,
                })
                setPositon(-1)
            },300)
        }else if (!(position < 0)) {
            setTimeout(()=>{
                setSliderStyle({
                    transition: `transform 0ms`,
                })
                setPositon(-(products.length-4))
            },300)
        }
    },[position])


    function sizeCardSlider(){
        let size;
        if (viewportWidth > 680) {
            size = "33.3333333%";
        }else if(viewportWidth > 480){
            size = "50%"
        }else{
            size = "100%"
        }
        return size
    };

    return(
        <div>
            <section id={style.container}>
                <div id={style.top}>
                    <label>
                        <Link to={`/category/${category.toLowerCase()}`}>
                            <img src={icon} alt={category} />
                            <h1>{category}</h1>
                        </Link>                      
                    </label>
                    <div id={style.deco}></div>
                </div>
                <div>
                    <div>
                        <div id={style.content}>
                            <div id={style.leftSide}>
                                <img src={promocional} alt="" />  
                            </div>
                            <div id={style.rigthSide}>
                                <div style={{height:"100%", width:"100%"}}>
                                    <div style={{height:"100%",  width:"100%"}}>
                                        <section style={{height:"100%", position:"relative", paddingRight:"24px", width:"100%"}}>
                                            <div id={style.frame}>
                                                <div id={style.cardsContainer} style={{width:`calc(${sizeCardSlider()}* ${products?.length})`, minWidth:`calc(${sizeCardSlider()} * ${products?.length})`, maxWidth:`calc(${sizeCardSlider()} * ${products?.length})` ,...sliderStyle, transform:`translate3d(calc((100% / ${products?.length}) * ${position}),0,0)`, }}>
                                                {
                                                    products.map((e, i) => <OtherCard key={e._id + i} brand={e.brand} category={e.category} image={e.image} price={e.price} name={e.name} id={e._id} stock={e.stock} />)
                                                }
                                                </div>
                                            </div>
                                            <button id={style.leftArrow} onClick={()=> backwardHandler()}>
                                                    <div>
                                                        <img src={arrow} alt="" />
                                                    </div>
                                                </button>
                                                <button id={style.rigthArrow} onClick={()=> forwardHandler()}>
                                                    <div>
                                                        <img src={arrow} alt="" />
                                                    </div>
                                                </button>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};


export default SliderCategory;