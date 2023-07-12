import React, { useEffect, useState, ChangeEvent } from 'react';
import style from "./CreateProduct.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import swal from 'sweetalert2';

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

  const handleFileChange = (e) => {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Debe seleccionar una categoría"),
    name: Yup.string().required("Debe ingresar un nombre").max(100, "El nombre debe tener como máximo 100 caracteres"),
    price: Yup.number().required("Debe ingresar un precio").positive("El precio debe ser positivo").integer("El precio debe ser un número entero").min(1, "El precio debe ser mayor o igual a 1"),
    stock: Yup.number().required("Debe ingresar una cantidad de stock").positive("La cantidad de stock debe ser positiva").integer("La cantidad de stock debe ser un número entero").min(1, "La cantidad de stock debe ser mayor o igual a 1"),
    image: Yup.mixed().test('fileSize', 'La imagen debe tener un tamaño de 640x640 píxeles', (value) => {
      if (!value) return true; // Permite que el campo sea opcional si no se ha seleccionado una imagen
  
      const file = value.file; // Accede al archivo seleccionado
  
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
  
        img.onload = function () {
          if (img.width === 640 && img.height === 640) {
            resolve(true); // El tamaño de la imagen es válido
          } else {
            reject(false); // El tamaño de la imagen no es válido
          }
        };
      });
    }),
  });

  const formik = useFormik({
    initialValues: JSON.parse(localStorage.getItem("productForm")) || {
      name: "",
      price: 0,
      category: "",
      brand: "",
      stock: 0
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
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
      } finally {
        setSubmitting(false);
      }
    }
  });
  useEffect(() => {
    // Guardar los valores del formulario en el almacenamiento local
    localStorage.setItem("productForm", JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <div className={`${style.createContainer} ${darkMode ? style.darkMode : ''}`}>
      <div>
        <br />
        <h1 className={style.tituloCreate}>Agregar producto</h1>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} className={style.formCreate}>
          <div className={style.formGroup}>
            <div>
              <label htmlFor="category">Categoría</label>
            </div>
            <div>
              <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className={style.select}
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.category && formik.errors.category && (
              <div className={style.error}>{formik.errors.category}</div>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={style.input}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={style.error}>{formik.errors.name}</div>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={style.input}
            />
            {formik.touched.price && formik.errors.price && (
              <div className={style.error}>{formik.errors.price}</div>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="brand">Marca</label>
            <input
              type="text"
              id="brand"
              name="brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              className={style.input}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div className={style.error}>{formik.errors.brand}</div>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="stock">Stock</label>
            <input
              type="text"
              id="stock"
              name="stock"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stock}
              className={style.input}
            />
            {formik.touched.stock && formik.errors.stock && (
              <div className={style.error}>{formik.errors.stock}</div>
            )}
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
          {formik.touched.image && formik.errors.image && (
              <div className={style.error}>{formik.errors.image}</div>
            )}
          <div className={style.formGroup}>
            <input type="submit" value="Agregar" className={style.button} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
