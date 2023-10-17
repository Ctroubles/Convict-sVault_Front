import React, { useEffect, useRef, useState } from "react";
import styles from "./Payment.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import CartComponent from "./components/carrito/carrito"
import logoHeader from "../../assets/Super Reo with.png"
import Formulario from "./components/formulario/formulario";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Url_deploy_back from "../../util/deploy_back";


function PaymentView({user}) {

  const history = useHistory();
  const formRef = useRef(null)


  const {cart}  = useSelector((e) => e);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});



  const getData = async (cart) => {
    let total = 0;
    const carrito = await Promise.all(
      cart.map(async (e) => {
        const key = Object.keys(e)[0];
        const { data } = await axios.get(`${Url_deploy_back}/products/${key}`);
        if (!data.hasOwnProperty('price')) {
          throw new Error('Uno de los productos del carrito parece estar dañada');
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
                  <Formulario user={user} formRef={formRef} errors={errors} setErrors={setErrors}/>
              </div>
              <div id={styles.cart}>
                  <CartComponent loading={loading} items={items} total={total} user={user} formRef={formRef} setErrors={setErrors}/>
              </div>
            </div>
          )
      }
    
    </div>
  );
 
}

export default PaymentView;