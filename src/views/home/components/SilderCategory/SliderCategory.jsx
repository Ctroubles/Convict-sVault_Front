import style from "./SliderCategory.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import OtherCard from "./components/OtherCard/OtherCard";
import Skeleton from 'react-loading-skeleton';
import arrow from "../../../../assets/icons/arrow_icon.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Url_deploy_back from "../../../../util/deploy_back";
import LoaderCard from "./components/LoaderCard/LoaderCard";
import { FaRing, FaLaptop, FaBox, FaTshirt, FaToolbox, FaSuitcase, FaHatCowboy, FaCog} from 'react-icons/fa';
import { GiLipstick, GiRunningShoe } from 'react-icons/gi';
import { MdOutlineSmartToy } from "react-icons/md"
import { AiFillSetting } from "react-icons/ai"
import promocional from "./assets/imagenes_promocional/imagen_temporal.jpg";
import promocional2 from "../../../../assets/icons/BANNER OCTUBRRE (1).jpg"


const categoryIcons = {
    Belleza: <GiLipstick className={`${style.largeIcon} ${style.iconColor}`} />, // Aplicar estilos de tamaño y color
    Joyeria: <FaRing className={`${style.largeIcon} ${style.iconColor}`} />,
    Tecnologia: <FaLaptop className={`${style.largeIcon} ${style.iconColor}`} />,
    Calzado: <GiRunningShoe className={`${style.largeIcon} ${style.iconColor}`} />,
    Juguetes: <MdOutlineSmartToy className={`${style.largeIcon} ${style.iconColor}`} />,
    Muebles: <FaBox className={`${style.largeIcon} ${style.iconColor}`} />,
    Ropa: <FaTshirt className={`${style.largeIcon} ${style.iconColor}`} />,
    Artesanias: <FaToolbox className={`${style.largeIcon} ${style.iconColor}`} />,
    Equipaje: <FaSuitcase className={`${style.largeIcon} ${style.iconColor}`} />,
    Agropecuario: <FaHatCowboy className={`${style.largeIcon} ${style.iconColor}`} />,
    Servicios: <FaCog className={`${style.largeIcon} ${style.iconColor}`} />,
    Repuestos: <AiFillSetting className={`${style.largeIcon} ${style.iconColor}`} />,
};

const SliderCategory = ({ category, viewportWidth }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [position, setPosition] = useState(-1);
  const [sliderStyle, setSliderStyle] = useState({});

  const [currentPromoImage, setCurrentPromoImage] = useState(promocional);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const promoImages = [promocional, promocional2];

    const changePromoImage = () => {
      const nextIndex = (promoIndex + 1) % promoImages.length;
      setCurrentPromoImage(promoImages[nextIndex]);
      setPromoIndex(nextIndex);
    };

    const promoInterval = setInterval(changePromoImage, 5000);

    return () => {
      clearInterval(promoInterval);
    };
  }, [promoIndex]);
  const promoImages = [promocional, promocional2];
  const goToPreviousPromo = () => {
    const previousIndex = (promoIndex - 1 + 2) % 2; // 2 is the number of promo images
    setCurrentPromoImage(promoImages[previousIndex]);
    setPromoIndex(previousIndex);
  };

  const goToNextPromo = () => {
    const nextIndex = (promoIndex + 1) % 2; // 2 is the number of promo images
    setCurrentPromoImage(promoImages[nextIndex]);
    setPromoIndex(nextIndex);
  };
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${Url_deploy_back}/products/category/${category}`);
      if (data.length) {
        const arrSlider = data.filter(e => Number(e.stock) > 0 && e.isActive);
        for (let i = 0; i < 5; i++) {
          arrSlider.push(arrSlider[i]);
        }
        setSliderStyle({
          transition: `transform 300ms ease`,
        });
        setProducts(arrSlider);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const [canCall, setCanCall] = useState(true);

  const forwardHandler = () => {
    if (!canCall) return;
    setSliderStyle({
      transition: `transform 300ms ease`,
    });
    setPosition(position - 1);
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
    setPosition(position + 1);
    setCanCall(false);
    setTimeout(() => {
      setCanCall(true);
    }, 300);
  };

  useEffect(() => {
    if (!(position >= -products.length + 5)) {
      setTimeout(() => {
        setSliderStyle({
          transition: `transform 0ms ease`,
        });
        setPosition(-1);
      }, 300);
    } else if (!(position < 0)) {
      setTimeout(() => {
        setSliderStyle({
          transition: `transform 0ms`,
        });
        setPosition(-(products.length - 5));
      }, 300);
    }
  }, [position]);

function sizeCardSlider() {
  let size;
  if (viewportWidth > 680) {
    size = category === "Belleza" ? "33.3333333%" : "20%";
  } else if (viewportWidth > 480) {
    size = category === "Belleza" ? "33.3333333%" : "20%";
  } else {
    size = "100%";
  }
  return size;
}

  if (loading) {
    return (
      <div>
        <section id={style.container}>
          <div id={style.top}>
            <label>
              <span>
                {categoryIcons[category]}
                <h1 style={{ height: '42px', width: '230px' }}>
                  <Skeleton />
                </h1>
              </span>
            </label>
            <div id={style.deco}></div>
          </div>
          <div>
            <div>
              <div id={style.content}>
                <div id={style.leftSide}>
                  <div className={style.placeHolderBanner}>
                    <Skeleton />
                  </div>
                </div>
                <div id={style.rigthSide}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <div style={{ height: "100%", width: "100%" }}>
                      <section style={{ height: "100%", position: "relative", paddingRight: "24px", width: "100%" }}>
                        <div id={style.frame}>
                          <section id={style.cardsContainerLoading} style={{ width: `calc(${sizeCardSlider()}* ${6})`, minWidth: `calc(${sizeCardSlider()} * ${6})`, maxWidth: `calc(${sizeCardSlider()} * ${6})`, ...sliderStyle, transform: `translate3d(calc((100% / ${6}) * ${position}),0,0)`, }}>
                            {
                              [1, 2, 3, 4, 5, 6].map((e, i) => <LoaderCard key={i} />)
                            }
                          </section>
                        </div>
                        <button id={style.leftArrow} >
                          <div>
                            <img src={arrow} alt="" />
                          </div>
                        </button>
                        <button id={style.rigthArrow}>
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
  }

  if (products.length) {
    const isBelleza = category === "Belleza";
  const cardWidth = isBelleza ? "33.3333333%" : "20%";
    return (
      <div>
        <section id={style.container}>
          <div id={style.top}>
            <label>
              <Link to={`/category/${category.toLowerCase()}`}>
                {categoryIcons[category]}
                <h1>{category}</h1>
              </Link>
            </label>
            <div id={style.deco}></div>
          </div>
          <div>
            <div>
              <div id={style.content}>
              {category === "Belleza" && (
  <div id={style.leftSide}>
    <div id={style.imageContainer}>
      <img src={currentPromoImage} alt="promocional" />
      <div id={style.buttonsContainer}>
        <button onClick={goToPreviousPromo} className={style.roundButton}>
          &lt;
        </button>
        <button onClick={goToNextPromo} className={style.roundButton}>
          &gt;
        </button>
      </div>
    </div>
  </div>
)}
                
                <div id={style.rigthSide}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <div style={{ height: "100%", width: "100%" }}>
                      <section style={{ height: "100%", position: "relative", paddingRight: "24px", width: "100%" }}>
                        <div id={style.frame}>
                          <div id={style.cardsContainer} style={{ width: `calc(${cardWidth}* ${products?.length})`, minWidth: `calc(${cardWidth} * ${products?.length})`, maxWidth: `calc(${cardWidth} * ${products?.length})`, ...sliderStyle, transform: `translate3d(calc((100% / ${products?.length}) * ${position}),0,0)`, }}>
                            {
                              products.map((e, i) => <OtherCard key={e._id + i} brand={e.brand} category={e.category} image={e.image} price={e.price} name={e.name} id={e._id} stock={e.stock} />)
                            }
                          </div>
                        </div>
                        <button id={style.leftArrow} onClick={() => backwardHandler()}>
                          <div>
                            <img src={arrow} alt="" />
                          </div>
                        </button>
                        <button id={style.rigthArrow} onClick={() => forwardHandler()}>
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
    );
  } else {
    return (
      <></>
    );
  }
}

export default SliderCategory;