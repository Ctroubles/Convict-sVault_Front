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

function Products({darkMode}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(13); 
  const [isMobile, setIsMobile] = useState(false);
  const [ activeFilter, setActiveFilter] = useState("activos")

  //////darkmode///////
  const [tableClassName, setTableClassName] = useState(style.table);

  useEffect(() => {
    const updatedTableClassName = darkMode ? `${style.table} ${style.darkModeTable}` : style.table;
    setTableClassName(updatedTableClassName);
  }, [darkMode]);




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
      await axios.put(`http://localhost:3001/products/isActive/${product._id}`, {
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
    await axios.put(`http://localhost:3001/products/isActive/${product._id}`, {
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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [filteredProducts]);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleToggleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    const filtroProductos = products.filter((product) => {
      if (filter === "activos") {
        return product.isActive;
      } else if (filter === "inactivos") {
        return !product.isActive;
      } else {
        return true;
      }
    });
    setFilteredProducts(filtroProductos);
  };

  const handleSearch = () => {
    if (searchTerm === "") {
      handleToggleFilter(activeFilter); // Aplicar filtro actual
    } else {
      const filtered = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };
  return (
    <div className={`${style.productsContainer} ${darkMode ? style.darkMode : ''}`}>

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
        <div id={style.containerButt}>
          <button
            className={`${style.filterButton} ${activeFilter === 'activos' ? style.activeFilterButton : ''}`}
            onClick={() => handleToggleFilter("activos")}
          >
            <FaFilter /> Activos
          </button>
        </div>
        <button
          className={`${style.filterButton} ${activeFilter === 'inactivos' ? style.activeFilterButton : ''}`}
          onClick={() => handleToggleFilter('inactivos')}
        >
          <FaFilter /> Inactivos
        </button>
      </div>
    </div>
    <div style={{width:"100%", maxWidth:"1300px"}}>
      <div id={style.tableContainer} className={`${tableClassName}`}>
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
    </div>
      <div className={style.containerAdd}>
        <Link to="/dashboard/products/create" className={style.buttonsAdd}><IoMdAddCircle className={style.iconoAdd} /></Link>
      </div>
    </div>
  );
}

export default Products;
