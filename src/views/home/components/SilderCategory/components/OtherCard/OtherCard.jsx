import style from "./OtherCard.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserCart } from "../../../../../../Redux/store/actions/actions";
import Url_deploy_back from "../../../../../../util/deploy_back";



const OtherCard = ({brand,category,image,price,name,id}) =>{

    const {id:userID} = useSelector(state=>state)
    const dispatch = useDispatch()

    const addToCar = async() =>{
        const {data} = await axios.put(`${Url_deploy_back}/cart/addItem`,{
            "userid":userID,
            "itemid":id,
        })
        dispatch(setUserCart(data));
    }

    return(
        <div id={style.CardContainer} style={{flexBasis:`calc(100% / ${3})`, width:`calc(100% / ${3})`, maxWidth:`calc(100% / ${3})`}} >
            <div id={style.card} style={{height:"100%",}}>
                <span >
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
                                    <button onClick={()=>addToCar()}>
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

export default OtherCard;