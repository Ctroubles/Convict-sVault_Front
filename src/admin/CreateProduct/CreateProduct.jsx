import React, { useEffect, useState, ChangeEvent } from 'react'
import style from "./CreateProduct.module.css"
import { useFormik } from "formik";
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
    "Artasania",
    "Agropecuario",
    "Servicios",
] 

function CreateProduct() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.value) {
            setFile(e.target.files[0]);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            price: 0,
            category: "",
            brand: "",
            stock: 0
        },
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

                const { data: data2} = await axios.post(`http://localhost:3001/upload/`, data)
                console.log(data2)
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
                setSubmitting(false)
            }
        }
    })

    return (
        <div className={style.createContainer}>
            <div>
                <h1>Agregar producto</h1>
                <br />
                <p>Agregue los productos a la base de datos de SuperReo Y+</p>
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
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="price">Precio</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                            min={1}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="brand">Marca</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            onChange={formik.handleChange}
                            value={formik.values.brand}
                            className={style.input}
                        />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="text"
                            id="stock"
                            name="stock"
                            onChange={formik.handleChange}
                            value={formik.values.stock}
                            className={style.input}
                        />
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
                    <div className={style.formGroup}>
                        <input type="submit" value="Agregar" className={style.button} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
