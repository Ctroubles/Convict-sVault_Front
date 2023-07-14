import { useEffect } from "react";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import CardCart from "./card_cart/CardCart";
// import { PayPalButtons } from "@paypal/react-paypal-js";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";


const Cart = ({ setCartStatus }) => {
  const {cart}  = useSelector((e) => e);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useHistory();

  const handleConfirmOrder = () => {
    history.push(`/payment`);
  };
  

  const obtenerProductos = async (cart) => {
    let total = 0;
    const carrito = await Promise.all(
      cart.map(async (e) => {
        const key = Object.keys(e)[0];
        const { data } = await axios.get(`http://localhost:3001/products/${key}`);
        if (!data.hasOwnProperty('price')) {
          throw new Error('El objeto de producto no contiene una propiedad "price".');
        }
  
        // Verificar si la cantidad es mayor al stock
       
        total = total + data.price * e[key];
        return { ...data, quantity: e[key] };
      })
    );
  
    setItems(carrito);
    setTotal(total);
    setLoading(false);
  };
  useEffect(() => {
    obtenerProductos(cart);
  }, [cart]);

  return (
    <div id={style.CartModal}>
      <div
        id={style.closeButton}
        onClick={() => setCartStatus(false)}
        className={!loading ? style.open : undefined}
      >
        <span></span>
        <span></span>
      </div>
      <div style={{ height: "100vh" }}>
        <div id={style.Card} style={!loading ? { transform: "translateX(0px)" } : undefined}>
          <div>
            <div style={{ padding: "12px 0 12px 15px", backgroundColor: "#009fe3" }}>
              <label id={style.tittle}>
                <h1>Carrito</h1>
              </label>
            </div>
            <div>
              <div style={{ padding: "15px 28px 0 5px" }}>
                <div id={style.cardsContainer}>
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
              <div className={style.linesData}>
                <div>
                  <label>Subtotal</label>
                </div>
                <div>
                  <span>$ {total}</span>
                </div>
              </div>
              <div className={style.linesData}>
                <div>
                  <label>Delivery</label>
                </div>
                <div>
                  <span></span>
                </div>
              </div>
              <div>
                <div>
                  <div id={style.sectionTotal}>
                    <div>
                      <label>Total</label>
                    </div>
                    <div>
                      <span>$ {total}</span>
                    </div>
                  </div>
                </div>
                <button id={style.confirmButton} onClick={handleConfirmOrder}>
             Confirmar orden
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
