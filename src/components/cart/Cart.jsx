import { useEffect, useRef } from "react";
import style from "./Cart.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import CardCart from "./card_cart/CardCart";
import Url_deploy_back from "../../util/deploy_back";
import { useHistory } from "react-router-dom";


const Cart = ({ setCartStatus }) => {
  
  const refModal = useRef(null)
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
        const { data } = await axios.get(`${Url_deploy_back}/products/${key}`);
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
    obtenerProductos(cart);
  }, [cart]);


  const modalClose = ({target}) =>{
    if (target.id === style.CartModal) {
      refModal.current.classList.add(style.getOut);
      setLoading(true)
      setTimeout(()=>{
        setCartStatus(false)
      },600)
    }
  };
   
  const handlerClose = () =>{
      setLoading(true)
      refModal.current.classList.add(style.getOut);
      setTimeout(()=>{
        setCartStatus(false)
      },600)
  };

  return (
    <div id={style.CartModal} onClick={(e)=>modalClose(e)} ref={refModal}>
      <div
        id={style.closeButton}
        onClick={() => handlerClose()}
        className={!loading ? style.open : undefined}
      >
        <div>
          <span></span>
          <span></span>
        </div>         
      </div>
      <div id={style.cartContainer}>
        <div id={style.Card} style={!loading ? { transform: "translateX(0px)" } : undefined}>
          <div>
            <div id={style.tittle}>
              <label>
                <h1>Carrito</h1>
              </label>
            </div>
            <div>
              <div style={{ padding: "10px 28px 0 5px" }}>
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
