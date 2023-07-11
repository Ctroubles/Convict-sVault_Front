import styles from "./carrito.module.css";
import CardCart from "../../../../components/cart/card_cart/CardCart";
import urlBack from "../../../../util/deploy_back";
import axios from "axios";
import PAYU from "../paymentButton/payu";

const Carrito = ({loading, items, total, user}) =>{


    return (
        <div style={{}}>
        <div id={styles.Cart}>
          <div>
            <div style={{ padding: "20px 0 0px 15px" }}>
              <label id={styles.tittle}>
                <h1>Resumen de compra</h1>
              </label>
            </div>
            <div>
              <div style={{ padding: "15px 28px 0 5px" }}>
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
                    <PAYU loading={loading} items={items} total={total} user={user}/>
                </div>                                  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Carrito;