import React, { useEffect, useState } from 'react';
import style from "./CreateProduct.module.css";
import axios from 'axios';
import swal from 'sweetalert2';
import { validadorLevel2, validadores } from '../util/validadores';

const categorias = [
  "Equipaje",
  "Belleza",
  "Joyeria",
  "Tecnologia",
  "Calzado",
  "Juguetes",
  "Muebles",
  "Ropa",
  "Mascotas",
  "Turismo",
  "Artesania",
  "Agropecuario",
  "Servicios",
];

function CreateProduct({ darkMode }) {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    category: "",
    name: "",
    price: 0,
    brand: "",
    stock: 0
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  
    const newErrors = validadores(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name],
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validadorLevel2(setErrors, values);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (values.stock === 0) {
      swal.fire({
        title: 'Error',
        text: 'Por favor ingrese una cantidad válida',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEnterKey: true
      });
      return;
    }

    try {
      var data = new FormData();
      data.append('image', file);
      data.append('name', values.name);
      data.append('category', values.category);
      data.append('price', values.price);
      data.append('brand', values.brand);
      data.append('stock', values.stock);

      const { data: data2 } = await axios.post(`http://localhost:3001/upload/`, data);
      console.log(data2);
      swal.fire({
        title: `Su componente se ha creado con éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEnterKey: true
      });
    } catch (error) {
      console.error(error);
      swal.fire({
        title: 'Error al crear el producto',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timer: 3000,
        timerProgressBar: true
      });
    }
  };

  useEffect(() => {
    // Guardar los valores del formulario en el almacenamiento local
    localStorage.setItem("productForm", JSON.stringify(values));
  }, [values]);

  return (
    <div className={`${style.createContainer} ${darkMode ? style.darkMode : ''}`}>
      <div>
        <br />
        <h1 className={style.tituloCreate}>Agregar producto</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={style.formCreate}>
          <div className={style.formGroup}>
            <div>
              <label htmlFor="category">Categoría</label>
            </div>
            <div>
              <select
                id="category"
                name="category"
                onChange={handleInputChange}
                value={values.category}
                className={`${style.select} ${errors.category && style.inputError}`}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && <div className={style.error}>
              <p>Debe seleccionar una categoría</p>
              </div>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={values.name}
              className={`${style.input} ${errors.name && style.inputError}`}
            />
            {errors.name && <div className={style.error}>
              <p>Debe ingresar un nombre con maximo 100 caracteres</p>
              </div>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleInputChange}
              value={values.price}
              className={`${style.input} ${errors.price && style.inputError}`}
            />
            {errors.price && <div className={style.error}>
              <p>Debe ingresar un precio mayor o igual que 1, tambien debe ser entero</p>
              </div>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="brand">Marca</label>
            <input
              type="text"
              id="brand"
              name="brand"
              onChange={handleInputChange}
value={values.brand}
className={`${style.input} ${errors.brand && style.inputError}`}
/>
{errors.brand && <div className={style.error}>
  <p>Este campo tiene un maximo de 50 caracteres</p>
  </div>}
</div>
<div className={style.formGroup}>
<label htmlFor="stock">Stock</label>
<input
           type="text"
           id="stock"
           name="stock"
           onChange={handleInputChange}
           value={values.stock}
           className={`${style.input} ${errors.stock && style.inputError}`}
         />
{errors.stock && <div className={style.error}>
  <p>Debe ingresar una cantidad de estoy mayor o igual a 1</p>
  </div>}
</div>
<div className={style.formGroup}>
<label htmlFor="image">Imagen del Producto</label>
<input
           type="file"
           id="image"
           onChange={handleFileChange}
           className={style.inputFile}
         />
</div>
{errors.image && <div className={style.error}>{errors.image}</div>}
<div className={style.formGroup}>
<input type="submit" value="Agregar" className={style.button} />
</div>
</form>
</div>
</div>
);
}

export default CreateProduct;