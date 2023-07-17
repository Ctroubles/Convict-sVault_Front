import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { setUserCart } from "../../Redux/store/actions/actions";

const Card = ({brand,category,image,price,name,id}) =>{

    const {id:userID} = useSelector(state=>state)
    const dispatch = useDispatch()

    const addToCar = async(e) =>{
        e.stopPropagation();
        const {data} = await axios.put("http://localhost:3001/cart/addItem",{
            "userid":userID,
            "itemid":id,
        })
        dispatch(setUserCart(data));
    }


    return(
        <div id={style.Card}>
            <span>
                <section>
                    <div id={style.ImgSection}>
                        <div>
                            <img src={image} alt={name} />
                        </div>
                    </div>
                    <div style={{height:"100%", display:"flex", flexDirection:"column"}}>
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
                                <button onClick={(e)=>addToCar(e)}>
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

export default Card;