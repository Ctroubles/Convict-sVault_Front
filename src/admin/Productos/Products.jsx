import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./Products.module.css";
import {FaTrash, FaEdit } from "react-icons/fa"
import CreateProduct from '../CreateProduct/CreateProduct';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={style.productsContainer}>
      <div>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product._id}</td>
              <td>
              <button className={style.editButton}><FaEdit/>Editar</button>
              <button className={style.deleteButton}><FaTrash/>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/dashboard/products/create" className={style.buttons}>Agregar Producto</Link>
    </div>
  );
}

export default Products;
