import styles from "./carrito.module.css";
import CardCart from "../../../../components/cart/card_cart/CardCart";
import { validatorsLevel2 } from "../../validators";
import { useDispatch } from "react-redux";
import { setPurchaseForm } from "../../../../Redux/store/actions/actions";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Url_deploy_back from "../../../../util/deploy_back";
const Carrito = ({ loading, items, total, formRef, setErrors }) => {
  const dispatch = useDispatch();

  const pagarAutomatically = async (sessionId) => {
    const apiKey = 'e95deec204ee959cd0fad3b4c2082d54';
    const privateKey = 'e244fdc8a0b2b994132f2b1b9baf9692';

    if (sessionId) {
      const handler = window.ePayco.checkout.configure({
        sessionId,
        external: false,
        test: false,
      });

      handler.openNew();
    } else {
      console.log("Error al obtener el sessionId");
    }
  };

  const getSessionId = async () => {
    try {
      const response = await axios.post(`${Url_deploy_back}/session`, {
        response: 'https://www.superreoy.com/home',
        confirmation: 'https://www.superreoy.com/home',
        name: items[0].name  || "default name",
        invoice: `PAGO${uuidv4()}`,
        description: `${items[0].name} X ${items[0].quantity}`,
        currency: 'cop',
        amount: `${total}`,
        country: 'CO',
        test: false,
        ip: '186.97.212.162',
      });

      const { data } = await response;
      const sessionId = data.sessionId;
      console.log(sessionId);
      return sessionId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const submitHandler = async () => {
    try {
      if (validatorsLevel2(setErrors, formRef.current)) {
        dispatch(setPurchaseForm(formRef.current));
        const sessionId = await getSessionId();
        pagarAutomatically(sessionId);
      }
    } catch (error) {
      console.error('Error during form validation:', error);
    }
  };
  
  return (
    <div style={{ height: "100%" }}>
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
                  {/* <Epayco loading={loading} items={items} total={total} formRef={formRef} setErrors={setErrors} /> */}

                  <button onClick={() => submitHandler()} id={styles.paymentButton} >Pagar con Epayco</button>
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