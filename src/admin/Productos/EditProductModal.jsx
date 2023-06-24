import React, { useState } from 'react';
import style from "./EditProductModal.module.css";
import axios from 'axios';
import swal from 'sweetalert2';

function EditProductModal({ product, closeModal, updateProduct }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
       const respuesta = await axios.put(`http://localhost:3001/products/${editedProduct._id}`, editedProduct);
       if (respuesta.status===200) {
        updateProduct(editedProduct); 
        closeModal();
        swal.fire({
          title: 'Cambios guardados',
          text: 'Los cambios en el producto se han guardado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timerProgressBar: 2000
        });
       }

    } catch (error) {
      console.log(error);
      swal.fire({
        title: 'Error al guardar los cambios',
        text: 'Ha ocurrido un error al guardar los cambios en el producto.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timerProgressBar: 3000
      });
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2 className={style.titleEditProd}>Edit Product</h2>
        <form onSubmit={handleFormSubmit} className={style.formContainer}>
          <div className={style.formRow}>
            <label htmlFor="name" className={style.formLabel}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>

          <div className={style.formRow}>
            <label htmlFor="brand" className={style.formLabel}>Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>

          <div className={style.formRow}>
            <label htmlFor="category" className={style.formLabel}>Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>

          <div className={style.formRow}>
            <label htmlFor='stock' className={style.formLabel}> Stock:</label>
            <input
            type='number'
            id='stock'
            name='stock'
            value={editedProduct.stock}
            onChange={handleInputChange}
            className={style.formInput}/>
          </div>

          <div className={style.formRow}>
            <label htmlFor="price" className={style.formLabel}>Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className={style.formInput}
            />
          </div>

          <div className={style.formButton}>
            <button type="submit" className={style.buttonPrimary}>Save Changes</button>
            <button type="button" onClick={closeModal} className={style.buttonSecondary}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
