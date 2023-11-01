import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../../../assets/icons/Banner ARTE.png";
import Url_deploy_back from '../../../util/deploy_back';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const logoStyle = {
  marginBottom: '20px',
  width: '700px',
  height: 'auto',
};

const boxStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#000',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
};

function PaymentConfirmationPage() {

  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(0); // ID de la transacción


  useEffect(() => {

    // Obtener la URL actual del navegador
var urlActual = window.location.href;

// Crear un objeto URL
var urlObj = new URL(urlActual);

// Obtener el valor de ref_payco
var refPayco = urlObj.searchParams.get("ref_payco");

// console.log(refPayco); // Esto imprimirá el valor de ref_payco si está presente en la URL actual

const endpointURL = `https://secure.epayco.co/validation/v1/reference/${refPayco}`;

// Realizar una solicitud HTTP GET al endpoint
fetch(endpointURL)
  .then(response => response.json())
  .then(data => {
    // Extraer el valor de x_ref_payco
    const xRefPayco = data.data.x_ref_payco;
    const xdescription = data.data.x_description;
    const xresponse = data.data.x_response;
    const xIdInvoice = data.data.x_id_invoice;
    console.log(xRefPayco); // Esto imprimirá el valor de x_ref_payco
    setTransactionId(xRefPayco);
    // console.log(xdescription);
    console.log(xresponse);
    // console.log(xIdInvoice)
    const productId = xIdInvoice.split('-')[0];
    if (xdescription && xIdInvoice) {
      updateStockFromDescription(xdescription, productId);
    }
    console.log(productId)
    setTransactionStatus(xresponse);
    localStorage.setItem(refPayco, 'processed');
  })
  .catch(error => {
    console.error("Error al realizar la solicitud:", error);
  });

  }, [transactionId]); // Agrega transactionId como una dependencia

  

  const updateStockFromDescription = async (description, productId, refPayco) => {
    console.log("hola",  refPayco)
    if (productId !== null) {
      const productInfoArray = description.split(', ');
  
      for (const productInfo of productInfoArray) {
        const quantityMatch = /X (\d+)/; // Expresión regular para capturar el número
  
        const quantityMatchResult = quantityMatch.exec(productInfo);
//   console.log(quantityMatchResult)
        if (quantityMatchResult) {
          const quantity = parseInt(quantityMatchResult[1], 10);
  
          if (!isNaN(quantity)) {
            if (localStorage.getItem(refPayco)) {
              alert(`Ya se habia realizado la actualizacion del stock con ref: ${refPayco}`);
              return;
            }
            try {
              await updateProductStock(productId, quantity); // Pasa productInfo en lugar de productId
              localStorage.setItem(refPayco, 'processed');
              alert('Stock actualizado con éxito');
            } catch (error) {
              console.error('Error al actualizar el stock del producto:', error.message);
              alert('Error al actualizar el stock del producto');
            }
          }
        }
      }
    } else {
      console.error('transactionId es null o no válido.');
      alert('Error: transactionId es null o no válido');
    }
  };
  
  
  
  const determineIsActive = (stock, quantity) => {
    console.log("first")
    // Si updatedStock es mayor que 0, isActive es true, de lo contrario, es false.
    return stock - quantity > 0;
  };
  

  const updateProductStock = async (productId, quantity) => {
    console.log("este es el id", productId);
    try {
      // Obtener datos del producto
      const { data } = await axios.get(`${Url_deploy_back}/products/${productId}`);
      const { isActive, name, price, image, brand, category, stock } = data;
  console.log(stock)
      // Calcular el stock actualizado
      let updatedStock = stock - quantity;
      console.log(updatedStock)
      updatedStock = Math.max(updatedStock, 0);
  
      const newIsActive = determineIsActive(updatedStock, quantity);
      console.log(newIsActive)
      // Define isActive basado en el valor de updatedStock
  
      await axios.put(`${Url_deploy_back}/products/${productId}`, {
        isActive: newIsActive,
        name,
        price,
        image,
        brand,
        category,
        stock: updatedStock,
      });
  
      console.log(`andres cachon ${productId} actualizado con éxito`);
    } catch (error) {
      console.error('Error al actualizar el stock del producto:', error.message);
    }
  };
  

  return (
    <div style={containerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      {isLoading ? (
        <p>Cargando...</p>
      ) : transactionStatus === 'Aceptada' ? (
        <div style={boxStyle}>
          <h1>¡Pago Aprobado!</h1>
          <p>Agradecemos tu compra y esperamos que disfrutes mucho tus productos. Queremos asegurarnos de que estés satisfecho con tu elección y que nuestros productos cumplan con tus expectativas. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para brindarte el mejor servicio posible.</p>
        </div>
      ) : (
        <div style={boxStyle}>
          <h2>Pago no aprobado</h2>
        </div>
      )}
    </div>
  );
}

export default PaymentConfirmationPage;
