import styles from "./carrito.module.css";
import CardCart from "../../../../components/cart/card_cart/CardCart";
import { PayPalButtons } from "@paypal/react-paypal-js";
import urlBack from "../../../../util/deploy_back";
import axios from "axios";
// import Payu from "../payu";

const Carrito = ({items, total, user}) =>{


  const { REACT_APP_PAYPAL_CLIENT_ID, REACT_APP_PAYPAL_SECRET } = process.env;
  const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com",
  };




  const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units: [{
                description: "Compra en SuperReoY+",
                amount: {
                    value: total,
                }

            }
        ]
    });
  };


  const onApprove = async (data, actions) => {
    send()
    const order = await actions.order.capture();
    const capturedOrder = await capturePayment(order.id);
    manejadorSucces(order)
  };


  const send = async () => {
    const sendData = {
        fromMail: "labodegadelreo.122@gmail.com",
        toMail: user.email,
        name: user.name,
        userId: user.id,
    }
    const mailer = await fetch(`${urlBack}/pagos/mailer`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(sendData)
    })
    console.log(mailer)
  }

   
  async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  const generateAccessToken = async () => {
    const auth = Buffer.from(
        `${REACT_APP_PAYPAL_CLIENT_ID}:${REACT_APP_PAYPAL_SECRET}`
    ).toString("base64");

    try {
        const response = await fetch(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token", {
                method: "POST",
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "grant_type=client_credentials",
            }
        );

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error al generar el token de acceso:", error);
        throw error;
    }
  };

  const manejadorSucces = async(order) =>{
    console.log("all good")
  }



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
                <PayPalButtons
                      onClick={(data,action)=>{
                        if (100) {
                            return action.resolve();
                        }else{
                            return action.reject();
                        }
                      }}
                      createOrder={(data, actions) => createOrder(data, actions)}
                      onApprove={(data, actions) =>onApprove(data, actions)}
                      onError={(err)=>alert(err)}
                  />
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Carrito;