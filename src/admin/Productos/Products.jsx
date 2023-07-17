import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import style from "./Products.module.css";
import { FaTrash, FaEdit, FaUndo, FaFilter, FaCircle } from "react-icons/fa";
import CreateProduct from '../CreateProduct/CreateProduct';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import EditProductModal from './EditProductModal';
import swal from 'sweetalert2';
import Url_deploy_back from '../../util/deploy_back';



function Products({ darkMode }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(13);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("activos");
  const [sortDirection, setSortDirection] = useState('asc');
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
      await axios.put(`${Url_deploy_back}/products/isActive/${product._id}`, {
        isActive: false
      });
  
      // Actualizar el estado del producto desactivado y sin stock
      const updatedProduct = { ...product, isActive: false };
      const updatedProducts = products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p));
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
  
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
      await axios.put(`${Url_deploy_back}/products/isActive/${product._id}`, {
        isActive: true
      });
  
      // Actualizar el estado del producto activado
      const updatedProduct = { ...product, isActive: true };
      const updatedProducts = products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p));
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
  
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
      const { data } = await axios.get(`${Url_deploy_back}/products`);
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
      setIsMobile(window.innerWidth <= 965);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  };
  const filtroProducts = products
  .filter((product) => {
    if (activeFilter === 'activos') {
      return product.isActive;
    } else if (activeFilter === 'inactivos') {
      return !product.isActive;
    } else {
      return true; // Mostrar todos los productos si no hay filtro activo o inactivo seleccionado
    }
  })
  .filter((product) => product.name?.toLowerCase().includes(searchTerm?.toLowerCase()))
  .sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortDirection === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  })
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar la página actual a la primera al realizar una nueva búsqueda
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
            Activos
            </button>
          </div>
          <button
            className={`${style.filterButton} ${activeFilter === 'inactivos' ? style.activeFilterButton : ''}`}
            onClick={() => handleToggleFilter('inactivos')}
          >
            Inactivos
          </button>
        </div>
      </div>
      <div style={{ width: "100%", maxWidth: "1300px" }}>
        <div id={style.tableContainer} className={`${tableClassName}`}>
          {filteredProducts.length === 0 ? (
            <div className={style.tableOverlay}>
              <div className={style.tableOverlayMessage}>
                No se encontraron productos con el nombre "<span>{searchTerm}</span>"
              </div>
            </div>
          ) : null}
          <div className="tableContainerInner">
           <table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                {isMobile ? null : <th>Marca</th>}
                <th>Categoria</th>
                <th>Precio</th>
                {isMobile ? null : <th>ID</th>}
                {isMobile ? null : <th>Stock</th>}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {filtroProducts
  .slice(indexOfFirstProduct, indexOfLastProduct)
  .map((product, index) => {
    
    return (
      <tr key={product._id}>
        <td>{getProductNumber(index)}</td>
        <td className={`${style.productName}`}>{product.name}</td>
        {isMobile ? null : <td>{product.brand || 'Sin marca'}</td>}
        <td>{product.category[0]}</td>
        <td>{product.price}</td>
        {isMobile ? null : <td className={`${style.productId}`}>{product._id}</td>}
        {isMobile ? null : <td>{product.stock}</td>}
        <td>
            <div className={style.desktopActions}>
              <button className={style.editButton} onClick={() => openModal(product)}>
                <FaEdit />
              </button>
              {product.isActive? (
                              <button onClick={() => handleRevoke(product)} className={style.deleteButton}><FaTrash /></button>
                            ) : (
                              <button onClick={() => handleRestore(product)} className={style.restoreButton}><FaUndo /></button>
                            )}
            </div>
        </td>
      </tr>
    );
  })}
            </tbody>
          </table>
          </div>
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
        <Link to="/dashboard/products/create" className={style.buttonsAdd}>
          <IoMdAddCircle className={style.iconoAdd} />
        </Link>
      </div>
    </div>
  );
}

export default Products;