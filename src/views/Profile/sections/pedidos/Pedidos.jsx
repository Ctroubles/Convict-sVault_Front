import React, { useEffect, useState } from 'react';
import style from './Pedidos.module.css';
import axios from 'axios';
import Url_deploy_back from '../../../../util/deploy_back';

const Pedidos = ({ pedidos = [] }) => {
  
  const [productDetails, setProductDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  useEffect(() => {
    // Limpia los detalles de productos al cambiar los pedidos
    setProductDetails([]);

    // Itera a través de los pedidos y obtiene los detalles de cada producto
    pedidos.forEach((pedido) => {
      fetchProductDetails(pedido);
    });
  }, [pedidos]);

  // Función para obtener detalles de productos por ID
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${Url_deploy_back}/products/${productId}`);
      const productData = response.data;

      // Añadir los detalles del producto al estado
      setProductDetails((prevProductDetails) => [...prevProductDetails, productData]);
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productDetails.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        {currentProducts.length > 0 &&
          currentProducts.map((product, index) => (
            <div key={index} className={style.pedidoItem}>
              <h3>{index + 1 + (currentPage - 1) * productsPerPage}</h3>
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
      <div className={style.pagination}>
        {productDetails.length > productsPerPage && (
          <div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= productDetails.length}>
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
