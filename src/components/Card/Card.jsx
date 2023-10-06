import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { setUserCart } from "../../Redux/store/actions/actions";
import Url_deploy_back from "../../util/deploy_back";
import { add_item, getItemQuantity } from "../../util/local_cart-handlers";
import { useState } from "react";
import { useEffect } from "react";


const Card = ({brand, stock, image,price,name,id}) =>{

    const {id:userID,cart} = useSelector(state=>state)
    const dispatch = useDispatch()

    const [isMaxQuantityReached, setIsMaxQuantityReached] = useState(getItemQuantity(cart,id) >= stock);


    const addToCar = async (e) => {
        e.stopPropagation();

        const quantity = getItemQuantity(cart,id);

        if (quantity  < stock) {   
          if (userID) {
                const { data } = await axios.put(`${Url_deploy_back}/cart/addItem`, {
                    userid: userID,
                    itemid: id,
                });
                dispatch(setUserCart(data));
          }else{
            const updateCart = add_item(cart, id);
            dispatch(setUserCart(updateCart));
          }           
        }
    };

    useEffect(()=>{
        setIsMaxQuantityReached(getItemQuantity(cart,id) >= stock);
    },[cart])

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
                                    {/* <small>
                                        $ {price + 32800}
                                    </small> */}
                                </div>
                                <div>
                                    <span>$ {price}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id={style.buttonSection}>
                                <button onClick={(e)=>addToCar(e)} id={isMaxQuantityReached?style.disabled:undefined} disabled={isMaxQuantityReached}>
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