import style from "./Card.module.css";

const Card = ({brand,category,image,price,name,id}) =>{
    return(
        <div id={style.Card}>
            <label>
                <section>
                    <div id={style.ImgSection}>
                        <div>
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div style={{height:"100%", flex:"1", display:"flex", flexDirection:"column"}}>
                        <div id={style.nameSection}>
                            <label>
                                 <p>{brand}</p>
                                 <h1>{name}</h1>
                            </label>
                        </div>
                        <div id={style.priceSection}>
                            <div>
                                <div>
                                    <small>
                                        $ {price + 32800}
                                    </small>
                                </div>
                                <div>
                                    <span>$ {price}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id={style.buttonSection}>
                                <button>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </label>
        </div>
    )
};

export default Card;