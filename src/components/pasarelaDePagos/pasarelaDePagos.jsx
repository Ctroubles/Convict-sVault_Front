import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Cart from "../cart/Cart";
import styles from "./PasarelaDePagos.module.css";

function PasarelaDePagos() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");

  const createOrder = (data, actions) => {
    // Order is created on the server and the order id is returned
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
        nombre,
        ciudad,
        direccion,
        celular,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data, actions) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  const handlePayNow = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          // Lógica para crear la orden en PayPal y obtener el ID de la orden
          // Aquí puedes utilizar la API de PayPal para crear la orden y obtener el ID correspondiente
        },
        onApprove: (data, actions) => {
          // Lógica para capturar la orden en PayPal y realizar las acciones necesarias en tu aplicación
        },
      })
      .render("#paypal-button-container"); // ID del contenedor donde se renderizarán los botones de PayPal
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
      {/* <Cart /> */}
      <button className={styles["pay-button"]} onClick={handlePayNow}>
  Ir a pagar
</button>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  );
}

export default PasarelaDePagos;
