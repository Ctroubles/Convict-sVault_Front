import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../../../assets/icons/Banner ARTE.png";
import Url_deploy_back from '../../../util/deploy_back';
import { useSelector } from "react-redux";

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

function PaymentConfirmationPage({ user }) {
  const userId = user._id;

  const cart = useSelector((state) => state.cart);

  const productIds = cart.map(item => Object.keys(item)[0]);

  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(0);
  const [xresponse, setXResponse] = useState('');

  useEffect(() => {
    var urlActual = window.location.href;
    var urlObj = new URL(urlActual);
    var refPayco = urlObj.searchParams.get("ref_payco");
    const endpointURL = `https://secure.epayco.co/validation/v1/reference/${refPayco}`;
  
    let xRefPayco, xdescription, xAmount;
  
    fetch(endpointURL)
      .then(response => response.json())
      .then(data => {
        xRefPayco = data.data.x_ref_payco;
        xdescription = data.data.x_description;
        const xresponse = data.data.x_response; // Definir xresponse aquí
        xAmount = data.data.x_amount;
        setTransactionId(xRefPayco);
        if (xdescription) {
          checkIfTransactionExists(xRefPayco, () => {
            updateStockFromDescription(xdescription, productIds, xRefPayco, xAmount, xresponse); // Pasar xresponse como argumento
            addProductToOrder(userId, productIds);
          });
        }
        setTransactionStatus(xresponse); // Actualizar el estado aquí
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

  const checkIfTransactionExists = (xRefPayco, callback) => {
    fetch(`http://localhost:3001/transactions/compras/${xRefPayco}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          console.log('La transacción ya existe en la base de datos.');
        } else {
          callback();
        }
      })
      .catch((error) => {
        console.error('Error al verificar la existencia del elemento en la base de datos:', error);
      });
  };

  const addProductToOrder = async (userId, productIds) => {
    try {
      const promises = productIds.map(async (productId) => {
        const requestBody = {
          productId: productId,
        };

        const response = await axios.post(`http://localhost:3001/users/addOrder/${userId}`, requestBody);

        if (response.status === 200) {
          console.log(`Producto con ID ${productId} agregado al pedido exitosamente.`);
        } else {
          console.error(`Error al agregar el producto con ID ${productId} al pedido.`);
        }
      });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const updateStockFromDescription = async (xdescription, productIds, xRefPayco, xAmount, xresponse) => {
    if (productIds !== null) {
      const productInfoArray = xdescription.split(', ');
  
      for (const productInfo of productInfoArray) {
        const productMatch = /(\w+) X (\d+)/;
        const productMatchResult = productMatch.exec(productInfo);
  
        if (productMatchResult) {
          const productName = productMatchResult[1];
          const quantity = parseInt(productMatchResult[2], 10);
  
          if (!isNaN(quantity)) {
            const productIndex = productInfoArray.indexOf(productInfo);
            if (productIndex < productIds.length) {
              const productId = productIds[productIndex];
              try {
                // Actualizar el stock primero
                await updateProductStock(productId, quantity);
  
                // Luego, agregar el producto al pedido
                addProductToOrder(userId, productIds);
  
                // Finalmente, registrar la transacción
                await registerTransaction(xRefPayco, xdescription, productIds, xAmount, xresponse);
  
                alert(`Stock actualizado con éxito${productId}`);
              } catch (error) {
                console.error('Error al actualizar el stock del producto:', error.message);
                alert('Error al actualizar el stock del producto');
              }
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
    return stock - quantity
  };

  const registerTransaction = async (xRefPayco, xdescription, productIds, xAmount, xresponse) => {
    try {
      const dataToSend = {
        xRefPayco,
        xdescription,
        xresponse,
        productIds, // Envía productIds como un array
        xAmount // Si es necesario
      };
  console.log("dataToSend:", dataToSend.xresponse)
      const backendEndpoint = `http://localhost:3001/transactions/create`;
  
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      .then(response => response.json());
      console.log(response.status);
  
      if (response.status === 200) {
        console.log('Transacción guardada en la base de datos con éxito');
      } else {
        console.error('Error al guardar la transacción en la base de datos');
      }
    } catch (error) {
      console.error('Error al guardar la transacción en la base de datos:', error.message);
    }
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
  
      console.log(`el producto con id: ${productId} actualizado con éxito`);
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
