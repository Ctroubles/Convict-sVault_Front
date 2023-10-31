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

  const url = 'http://localhost:3001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url_deploy_back}/transaction/details`);
        const status = response.data.status;
        const reference = response.data.referencePayco;
        // console.log("referenceEpayco", reference)
        setTransactionStatus(status);

        // Obtén la descripción de la transacción
        const transactionDescription = response.data.description || "";
        const productIdWithHyphen = response.data.log.x_id_invoice;
        const productId = productIdWithHyphen.split('-')[0]; // Obtiene la parte antes del guion
        console.log("ID del producto:", productId);
        console.log(response.data.description)
        const productIdParts = productId.split('-'); // Divide la cadena por guiones

if (productIdParts.length > 0) {
  const productIdBeforeDash = productIdParts[0];
  console.log("ID del producto antes del guion:", productIdBeforeDash);
} else {
  console.log("La cadena no contiene guiones.");
}

        if (transactionDescription && productId) {
          updateStockFromDescription(transactionDescription, productId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Obtener la URL actual del navegador
var urlActual = window.location.href;

// Crear un objeto URL
var urlObj = new URL(urlActual);

// Obtener el valor de ref_payco
var refPayco = urlObj.searchParams.get("ref_payco");

console.log(refPayco); // Esto imprimirá el valor de ref_payco si está presente en la URL actual

const endpointURL = `https://secure.epayco.co/validation/v1/reference/${refPayco}`;

// Realizar una solicitud HTTP GET al endpoint
fetch(endpointURL)
  .then(response => response.json())
  .then(data => {
    // Extraer el valor de x_ref_payco
    const xRefPayco = data.data.x_ref_payco;
    console.log(xRefPayco); // Esto imprimirá el valor de x_ref_payco
  })
  .catch(error => {
    console.error("Error al realizar la solicitud:", error);
  });

    const sendConfirmationData = () => {
      // Datos de confirmación de ejemplo
  
      // Realiza una solicitud POST al servidor con los datos de confirmación
      fetch('https://convict-s-vault-back.vercel.app/confirmation-epayco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Error al enviar datos de confirmación');
        }
      })
      .then(data => {
        console.log(data); // Mensaje de confirmación del servidor
      })
      .catch(error => {
        console.error(error);
      });
    };
    sendConfirmationData();
  }, [transactionId]); // Agrega transactionId como una dependencia

  

  const updateStockFromDescription = async (description, productId) => {
    console.log("hola",  productId)
    if (productId !== null) {
      const productInfoArray = description.split(', ');
  
      for (const productInfo of productInfoArray) {
        const quantityMatch = /X (\d+)/; // Expresión regular para capturar el número
  
        const quantityMatchResult = quantityMatch.exec(productInfo);
//   console.log(quantityMatchResult)
        if (quantityMatchResult) {
          const quantity = parseInt(quantityMatchResult[1], 10);
  
          if (!isNaN(quantity)) {
            if (localStorage.getItem(productId)) {
              alert(`La actualización de stock para la transacción ${productId} ya ha sido procesada`);
              return;
            }
  
            try {
              await updateProductStock(productId, quantity); // Pasa productInfo en lugar de productId
              localStorage.setItem(productId, 'processed');
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
  
      // Calcular el stock actualizado
      let updatedStock = stock - quantity;
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
  
      console.log(`Stock del producto ${productId} actualizado con éxito`);
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
