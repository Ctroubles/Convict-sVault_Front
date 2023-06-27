import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Cart from "../cart/Cart";
import styles from "./PasarelaDePagos.module.css";
import axios from "axios";

function PasarelaDePagos() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const { REACT_APP_PAYPAL_CLIENT_ID, APP_SECRET } = process.env;
  const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com",
  };

  async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;
    const response = await axios.post(
      url,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
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

  async function generateAccessToken() {
    const auth = Buffer.from(
      REACT_APP_PAYPAL_CLIENT_ID + ":" + APP_SECRET
    ).toString("base64");
    const response = await axios.post(
      `${baseURL.sandbox}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  }

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
      {/* <Cart /> */}
      {/* <button className={styles["pay-button"]}>Ir a pagar</button> */}
      <PayPalButtons createOrder={createOrder} />
    </div>
  );
}

export default PasarelaDePagos;