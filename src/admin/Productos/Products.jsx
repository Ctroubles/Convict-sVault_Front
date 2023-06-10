import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./Products.module.css";
import { FaTrash, FaEdit, FaUndo, FaFilter } from "react-icons/fa";
import CreateProduct from '../CreateProduct/CreateProduct';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import swal from 'sweetalert2';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("active");

  const handleRevoke = async (product) => {
    try {
      await axios.put(`http://localhost:3001/products/${product._id}`, {
        isActive: false
      });
      getProducts();
      swal.fire({
        title: 'Se desactivó el producto con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timerProgressBar: 2000
      });
    } catch (error) {
      console.log(error);
      swal.fire({
        title: 'Error al desactivar el producto',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timerProgressBar: 3000
      });
    }
  };

  const handleRestore = async (product) => {
  try {
    await axios.put(`http://localhost:3001/products/${product._id}`, {
      isActive: true
    });
    getProducts();
    swal.fire({
      title: 'Se restauró el producto con éxito',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timerProgressBar: 2000
    });
  } catch (error) {
    console.log(error);
    swal.fire({
      title: 'Error al restaurar el producto',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      timerProgressBar: 3000
    });
  }
};

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        ((filter === "active" && product.isActive) || (filter === "inactive" && !product.isActive))
      );
      setFilteredProducts(filtered);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={style.productsContainer}>
      <div className={style.searchContainer}>
  <input
    type="text"
    placeholder="Buscar producto"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyUp={handleSearch}
    className={style.searchInput}
  />
  <div className={style.filterButtons}>
    <button
      className={filter === "active" ? style.activeFilterButton : style.filterButton}
      onClick={() => setFilter("active")}
    >
      <FaFilter /> Activos
    </button>
    <button
      className={filter === "inactive" ? style.activeFilterButton : style.filterButton}
      onClick={() => setFilter("inactive")}
    >
      <FaFilter /> Inactivos
    </button>
  </div>
</div>
      <div className={`${style.tableContainer} ${style.table}`}>
        {filteredProducts.length === 0 ? (
          <div className={style.tableOverlay}>
            <div className={style.tableOverlayMessage}>
              No se encontraron productos con el nombre "<span>{searchTerm}</span>"
            </div>
          </div>
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>ID</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product._id}</td>
                <td className={product.isActive ? style.onlineStatus : style.offlineStatus}>{product.isActive ? 'Activo' : 'Inactivo'}</td>
                <td>
                      <button className={style.editButton}><FaEdit />Editar</button>
                      {product.isActive ? (
                        <button onClick={() => handleRevoke(product)} className={style.deleteButton}><FaTrash />Desactivar</button>
                      ) : (
                        <button onClick={() => handleRestore(product)} className={style.restoreButton}><FaUndo />Activar</button>
                      )}
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.containerAdd}>
        <Link to="/dashboard/products/create" className={style.buttonsAdd}><IoMdAddCircle className={style.iconoAdd} /></Link>
      </div>
    </div>
  );
}

export default Products;
