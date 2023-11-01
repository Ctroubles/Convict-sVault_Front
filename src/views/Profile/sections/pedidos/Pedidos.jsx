import React, { useEffect, useState } from 'react';
import style from './Pedidos.module.css';
import axios from 'axios';

const Pedidos = ({ pedidos = [] }) => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    // Función para obtener detalles de productos por ID
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        const productData = response.data;

        // Añadir los detalles del producto al estado
        setProductDetails((prevProductDetails) => [...prevProductDetails, productData]);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    // Resetear los detalles de productos cada vez que cambia el array de pedidos
    setProductDetails([]);

    // Iterar a través de los pedidos y obtener los detalles de cada producto
    pedidos.forEach((pedido) => {
      fetchProductDetails(pedido);
    });
  }, [pedidos]);

  if (pedidos.length === 0) {
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
        {productDetails.length > 0 &&
          productDetails.map((product, index) => (
            <div key={index} className={style.pedidoItem}>
              <h3> {index + 1}</h3>
              <div className={style.productInfo}>
                <div className={style.imageContainer}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={style.detailsContainer}>
                  <ul>
                    <li>Nombre: {product.name}</li>
                    <li>Precio: {product.price}</li>
                    <li>Marca: {product.brand}</li>
                    <li>
                      Categoría: {product.category && product.category.length > 0 ? product.category.join(', ') : 'N/A'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Pedidos;
