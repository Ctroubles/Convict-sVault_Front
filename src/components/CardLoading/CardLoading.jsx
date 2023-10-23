import Skeleton from "react-loading-skeleton";
import style from "./CardLoading.module.css";

const CardLoading = () =>{
    const isMaxQuantityReached = true

    return(
        <div id={style.Card}>
            <span>
                <section>
                    <div>
                        <div className={style.placeHolderBanner}>
                            <Skeleton />
                        </div>
                    </div>
                    <div style={{height:"100%", display:"flex", flexDirection:"column"}}>
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
                                <button disabled={isMaxQuantityReached}>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </span>
        </div>
    )
};

export default CardLoading;