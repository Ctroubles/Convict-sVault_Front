import style from "./LoaderCard.module.css";
import Skeleton from "react-loading-skeleton";



const LoaderCard = () =>{

    return(
        <div id={style.CardContainer} style={{flexBasis:`calc(100% / ${3})`, width:`calc(100% / ${3})`, maxWidth:`calc(100% / ${3})`}} >
            <div id={style.card} style={{height:"100%",}}>
                <span >
                    <section>
                        <div id={style.ImgSection}>
                            <div>
                                <div className={style.placeHolderBanner}>
                                    <Skeleton />
                                </div>
                            </div>
                        </div>
                        <div style={{height:"100%", flex:"1", display:"flex", flexDirection:"column"}}>
                            <div id={style.nameSection}>
                                <label>
                                    <p>
                                        <Skeleton />
                                    </p>
                                    <h1>
                                        <Skeleton />
                                    </h1>
                                </label>
                            </div>
                            <div id={style.priceSection}>
                                <div>
                                    <div>
                                        <small>
                                            <Skeleton style={{width: 60}} />
                                        </small>
                                    </div>
                                    <div>
                                        <span>
                                            <Skeleton style={{width: 80}} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div id={style.buttonSection}>
                                    <button >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </span>
            </div>
        </div>
    )
};

export default LoaderCard;