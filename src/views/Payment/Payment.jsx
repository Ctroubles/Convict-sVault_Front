import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import CartComponent from "./components/carrito/carrito"
import logoHeader from "../../assets/logo_superReoprincipal_model-4.png"
import Formulario from "./components/formulario/formulario";
import { useHistory } from "react-router-dom/cjs/react-router-dom";







function PaymentView({user}) {

  const history = useHistory();

  const {cart}  = useSelector((e) => e);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);



  const getData = async (cart) => {
    let total = 0;
    const carrito = await Promise.all(
      cart.map(async (e) => {
        const key = Object.keys(e)[0];
        const { data } = await axios.get(`http://localhost:3001/products/${key}`);
        if (!data.hasOwnProperty('price')) {
          throw new Error('El objeto de producto no contiene una propiedad "price".');
        }
        total = total + data.price * e[key];
        return { ...data, quantity: e[key] };
      })
    );

    setItems(carrito);
    setTotal(total);
    setLoading(false);
  };


  useEffect(() => {
    getData(cart);
  }, [cart]);





  return (
    <div id={styles.Payment}>
      <div id={styles.Header}>
        <div className={styles.container}>
          <div id={styles.logoSection}>
              <div>
                <img src={logoHeader} alt="" />
              </div>
          </div>
          <div id={styles.back}>
            <label>
                <span onClick={()=>history.goBack()}>Ir atrás</span>
            </label>
          </div>
        </div>
      </div>
      {
          !total ? (
            <div id={styles.loadingContainer}>
                <span></span>
                <span></span>
                <span></span>
            </div>
          ) : (
            <div id={styles.container}>
              <div id={styles.form}>
                  <Formulario user={user}/>
              </div>
              <div id={styles.cart}>
                  <CartComponent loading={loading} items={items} total={total} user={user}/>
              </div>
            </div>
          )
      }
    
    </div>
  );


 
}

export default PaymentView;
