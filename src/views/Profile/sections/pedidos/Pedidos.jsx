import React from 'react';
import style from './Pedidos.module.css';

const Pedidos = ({ orders=[] }) => {
    console.log(orders)

  if (orders.length === 0) {
    return (
      <div id={style.Direcciones}>
        <div id={style.noData}>
          Aún no has realizado ningún pedido
        </div>
      </div>
    );
  }

  return (
    <div id={style.Direcciones}>
      <h2>Tus Pedidos</h2>
      <div>
        {orders.map((order, index) => (
          <div key={index} className={style.pedidoItem}>
            <h3>Pedido {index + 1}</h3>
            <ul>
              {order.products.map((product, productIndex) => (
                <li key={productIndex}>
                  {product.name} - Cantidad: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedidos;
