import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./PasarelaDePagos.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import urlBack from "../../util/deploy_back";
function PasarelaDePagos() {
  const { user, isAuthenticated } = useAuth0()
  console.log();

  const {cart}  = useSelector((e) => e);

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const { REACT_APP_PAYPAL_CLIENT_ID, REACT_APP_PAYPAL_SECRET } = process.env;
  const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com",
  };
  const [total, setTotal] = useState(0);

  const totalAPagar = async (cart) => {
    let total = 0;
    await Promise.all(
      cart.map(async (e) => {
        const key = Object.keys(e)[0];
        const { data } = await axios.get(
          `${urlBack}/products/${key}`
        );
        total = total + data.price * e[key];
        console.log(total);
        return { ...data, quantity: e[key] };
      })
    );
    setTotal(total);
  };

  useEffect(() => {
    totalAPagar(cart);
  }, [cart]);


  const send = async() => {
    const sendData = {
        fromMail: "labodegadelreo.122@gmail.com",
        toMail: user.email,
        name: user.name,
        userId:user.id,
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
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
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
  

  ////////////////////////////////////////////////////////////////////

  const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units:[
            {
                description:"Compra en SuperReoY+",
                amount: {
                    value: 100,
                }

        }

        ]
    });
     };


     const onApprove = async(data, actions) => {
      send()
      const order = await actions.order.capture();
      // const capturedOrder = await capturePayment(order.id);
      manejadorSucces(order)
  };
  

const manejadorSucces = async(order) =>{
  console.log("all good")
}


  ////////////////////////////////////////////////////////////////////





  return (
    <div className={styles["payment-form"]}>
      <h2>Formulario de Pago</h2>
      <div className={styles["form-group"]}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="celular">Celular:</label>
        <input
          type="text"
          id="celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          pattern="[0-9]*"
        />
      </div>
      <PayPalButtons
            onClick={(data,action)=>{
              console.log("Estás apunto de efectuar la compra")

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
  );
}

export default PasarelaDePagos;
