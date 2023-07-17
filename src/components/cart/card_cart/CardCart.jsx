import style from "./CardCart.module.css"
import { capitalizeFirstLetter } from "../../../util";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { setUserCart } from "../../../Redux/store/actions/actions";
import { useState } from "react";
import Url_deploy_back from "../../../util/deploy_back"


const CardCart = ({name, img, price, brand, id, quantity, stock}) =>{

    const [isMaxQuantityReached, setIsMaxQuantityReached] = useState(quantity >= stock);
    const {id:userID} = useSelector(state=>state)
    const dispatch = useDispatch()

    const addToCar = async () => {
        if (quantity  < stock) {            
          const { data } = await axios.put(`${Url_deploy_back}/cart/addItem`, {
              userid: userID,
              itemid: id,
            });
          dispatch(setUserCart(data));
        }
        setIsMaxQuantityReached(quantity  >= stock);;
      };
    

    const subtractToCar = async() =>{
        const {data} = await axios.put(`${Url_deploy_back}/cart/subtractItem`,{
            "userid":userID,
            "itemid":id,
        })
        dispatch(setUserCart(data));
    }
    const removeToCar = async() =>{
        const {data} = await axios.put(`${Url_deploy_back}/cart/removeItem`,{
            "userid":userID,
            "itemid":id,
        })
        dispatch(setUserCart(data));
    }


    return(
        <div style={{position:"relative"}}>
            <div id={style.container}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div id={style.leftSection}>
                        <div id={style.imgContainer}>
                            <img src={img} alt={name} />
                        </div>
                        <div id={style.dataSection}>
                            <div>
                                <h2>{capitalizeFirstLetter(name)}</h2>
                            </div>
                            <div>
                                <p>{capitalizeFirstLetter(brand)}</p>
                            </div>
                            <div>
                                <label>
                                    $ {price}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id={style.quantitySection}>
                            <div><label onClick={()=>subtractToCar()}>-</label></div>
                            <div><span>{quantity}</span></div>
                            <div> <label onClick={() => addToCar()} disabled={isMaxQuantityReached}>+</label></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id={style.xButton} onClick={()=>removeToCar()}>
                <span>X</span>
            </div>
        </div>
    )
};

export default CardCart;