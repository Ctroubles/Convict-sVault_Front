import styles from "./carrito.module.css";
import CardCart from "../../../../components/cart/card_cart/CardCart";
import { validatorsLevel2 } from "../../validators";
import { useDispatch } from "react-redux";
import { setPurchaseForm } from "../../../../Redux/store/actions/actions";
import { useHistory } from 'react-router-dom';


const Carrito = ({loading, items, total, formRef, setErrors}) =>{

  const dispatch = useDispatch()
  const history = useHistory()

  const submitHandler = () => {
    if (validatorsLevel2(setErrors,formRef.current)) {
      dispatch(setPurchaseForm(formRef.current));
      history.push("/checkout/payment")
    }
  };
  
    return (
        <div style={{height:"100%"}}>
        <div id={styles.Cart}>
          <div>
            <div  id={styles.tittle}>
              <label>
                <h1>Resumen de compra</h1>
              </label>
            </div>
            <div>
              <div >
                <div id={styles.cardsContainer}>
                  {items.map((e) => (
                    <CardCart
                      key={e._id}
                      name={e.name}
                      img={e.image}
                      price={e.price}
                      brand={e.brand}
                      id={e._id}
                      quantity={e.quantity}
                      stock={e.stock}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "0 20px 0 20px" }}>
            <div>
              <div className={styles.linesData}>
                <div>
                  <label>Subtotal</label>
                </div>
                <div>
                  <span>$ {total}</span>
                </div>
              </div>
              <div className={styles.linesData}>
                <div>
                  <label>Delivery</label>
                </div>
                <div>
                  <span></span>
                </div>
              </div>
              <div>
                <div>
                  <div id={styles.sectionTotal}>
                    <div>
                      <label>Total</label>
                    </div>
                    <div>
                      <span>$ {total}</span>
                    </div>
                  </div>
                </div>
                <div id={styles.containerPaymentButton}>
                  <div id={styles.paymentButtonContainer}>
                      <button onClick={()=>submitHandler()} id={styles.paymentButton} >Pagar con Payu</button>
                  </div>
                </div>                                  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Carrito;