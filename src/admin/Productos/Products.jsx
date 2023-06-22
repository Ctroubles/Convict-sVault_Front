import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./Products.module.css";
import { FaTrash, FaEdit, FaUndo, FaFilter } from "react-icons/fa";
import CreateProduct from '../CreateProduct/CreateProduct';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import EditProductModal from './EditProductModal';
import swal from 'sweetalert2';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(13); 



  const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


const getProductNumber = (index) => {
  return indexOfFirstProduct + index + 1;
};


  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) => {
      if (product._id === updatedProduct._id) {
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };


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
    const sortedProducts = data.sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
    setFilteredProducts(sortedProducts);
    setCurrentPage(1); // Restablece la página actual a la primera al obtener los productos
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
const handleSearch = () => {
  if (searchTerm === "") {
    setFilteredProducts(products);
  } else {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        ((filter === "active" && product.isActive) ||
          (filter === "inactive" && !product.isActive))
    );
    setFilteredProducts(filtered);
  }

  setCurrentPage(1); // Restablece la página actual a la primera al realizar una nueva búsqueda
};
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [filteredProducts]);
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
              <th></th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>ID</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {filteredProducts
            .slice(indexOfFirstProduct, indexOfLastProduct)
            .map((product, index) => (
              <tr key={product._id}>
                <td>{getProductNumber(index)}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product._id}</td>
                <td>{product.stock}</td>
                <td className={product.isActive ? style.onlineStatus : style.offlineStatus}>{product.isActive ? 'Activo' : 'Inactivo'}</td>
                <td>
                                <button className={style.editButton} onClick={() => openModal(product)}>
                  <FaEdit /> Editar
                </button>
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
        <div className={style.pagination}>
  {/* <span>Página {currentPage}</span> */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Anterior
  </button>
  <button
    disabled={indexOfLastProduct >= filteredProducts.length}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Siguiente
  </button>
</div>
        {isModalOpen && (
  <EditProductModal
    product={selectedProduct}
    closeModal={() => setIsModalOpen(false)}
    updateProduct={updateProduct}
  />
)}
      </div>
      <div className={style.containerAdd}>
        <Link to="/dashboard/products/create" className={style.buttonsAdd}><IoMdAddCircle className={style.iconoAdd} /></Link>
      </div>
    </div>
  );
}

export default Products;
