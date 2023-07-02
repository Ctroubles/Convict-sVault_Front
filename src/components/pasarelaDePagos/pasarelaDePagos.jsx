import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./PasarelaDePagos.module.css";
import axios from "axios";

function PasarelaDePagos() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const { REACT_APP_PAYPAL_CLIENT_ID, REACT_APP_PAYPAL_SECRET } = process.env;
  const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com",
  };

  const createOrder = async () => {
    try {
      const accessToken = await generateAccessToken();
  
      const url = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
      const payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        ],
      };
  
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await axios.post(url, payload, { headers });
  
      return response.data;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  };
  
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
  createOrder={() => createOrder()}
  onApprove={(data, actions) => {
    return capturePayment(data.orderID)
      .then((result) => {
        console.log("Pago capturado:", result);
      })
      .catch((error) => {
        console.error("Error al capturar el pago:", error);
      });
  }}
/>

    </div>
  );
}

export default PasarelaDePagos;
