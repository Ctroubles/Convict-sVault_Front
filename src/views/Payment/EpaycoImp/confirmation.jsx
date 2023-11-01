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

function PaymentConfirmationPage({user}) {

  const cart = useSelector((state) => state.cart);
  // console.log("esto es lo que hay en el carrito", cart)

  const productIds = cart.map(item => Object.keys(item)[0]);
  // console.log(productIds);

  // console.log("hola", user._id)
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(0);


  useEffect(() => {
   
    // console.log("YA SE ACTUALIZOOOOOOOOOOO")
    var urlActual = window.location.href;
    var urlObj = new URL(urlActual);
    var refPayco = urlObj.searchParams.get("ref_payco");
    const endpointURL = `https://secure.epayco.co/validation/v1/reference/${refPayco}`;
  
    // Declarar variables
    let xRefPayco, xdescription, xresponse, xIdInvoice, xAmount;
  
    fetch(endpointURL)
      .then(response => response.json())
      .then(data => {
        xRefPayco = data.data.x_ref_payco;
        xdescription = data.data.x_description;
        xresponse = data.data.x_response;
        // xIdInvoice = data.data.x_id_invoice;
        xAmount = data.data.x_amount;
        console.log(xRefPayco);
        setTransactionId(xRefPayco);
        console.log(xresponse);
        if (xdescription && xIdInvoice) {
          updateStockFromDescription(xdescription, productIds, xRefPayco);
        }
        setTransactionStatus(xresponse);
        const userId = user._id
        addProductToOrder(userId, productIds)
  
        // Aquí puedes realizar la solicitud POST al backend con las variables definidas
        const dataToSend = {
          xRefPayco,
          xdescription,
          xresponse,
          productIds,
          xAmount // Si es necesario
        };
  
        // URL del endpoint en tu backend
        const backendEndpoint = `http://localhost:3001/transactions/create`;
  
        // Realiza una solicitud POST al backend
        fetch(backendEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Transacción guardada en la base de datos:', data);
  
          // Realiza la segunda solicitud dentro de este bloque
          fetch(`http://localhost:3001/transactions/compras/${xRefPayco}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              console.log('El elemento ya existe en la base de datos.');
            }
          })
          .catch(error => {
            console.error('Error al verificar la existencia del elemento en la base de datos:', error);
          });
        })
        .catch(error => {
          console.error('Error al guardar la transacción en la base de datos:', error);
        });
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });
  }, []);

      ////////////////////////////////////////////////////////////////////////////////
      const addProductToOrder = async (userId, productIds) => {
        try {
          // console.log("1",userId)
          console.log("addProductToOrder", productIds)
          // Define el cuerpo de la solicitud
          const requestBody = {
            productIds: productIds,
          };
      
          // Realiza la solicitud POST al endpoint
          const response = await axios.post(`http://localhost:3001/users/addOrder/${userId}`, requestBody);
      
          // Verifica si la solicitud fue exitosa
          if (response.status === 200) {
            console.log('Producto agregado al pedido exitosamente.');
            // Puedes realizar alguna acción adicional aquí si es necesario.
          } else {
            console.error('Error al agregar el producto al pedido.');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      };
  
  
      ////////////////////////////////////////////////////////////////////
  

      const updateStockFromDescription = async (description, productIds, xRefPayco) => {
        console.log("hola", xRefPayco);
      
        if (productIds !== null) {
          const productInfoArray = description.split(', ');
      
          for (const productInfo of productInfoArray) {
            const productMatch = /(\w+) X (\d+)/; // Expresión regular para capturar el nombre del producto y la cantidad
      
            const productMatchResult = productMatch.exec(productInfo);
      
            if (productMatchResult) {
              const productName = productMatchResult[1];
              const quantity = parseInt(productMatchResult[2], 10);
              console.log(productName)
      
              if (!isNaN(quantity)) {
                // Realizar la verificación de existencia en la base de datos
                try {
                  console.log("now");
                  const response = await fetch(`http://localhost:3001/transactions/compras/${xRefPayco}`);
                  const data = await response.json();
      
                  if (response.ok) {
                    console.log("first", data);
                  } else {
                    console.error('Error en la respuesta:', data);
                  }
                  if (data.length > 0) {
                    console.log('El elemento ya existe en la base de datos. No se actualizará el stock nuevamente.');
                  } else {
                    // Obtén el ID del producto correspondiente
                    const productIndex = productInfoArray.indexOf(productInfo);
                    if (productIndex < productIds.length) {
                      const productId = productIds[productIndex];
      
                      // Continuar con la actualización del stock
                      try {
                        // Realizar la actualización del stock
                        await updateProductStock(productId, quantity);
                        alert('Stock actualizado con éxito');
                      } catch (error) {
                        console.error('Error al actualizar el stock del producto:', error.message);
                        alert('Error al actualizar el stock del producto');
                      }
                    }
                  }
                } catch (error) {
                  console.error('Error al verificar la existencia del elemento en la base de datos:', error.message);
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
  

  const updateProductStock = async (productIds, quantity) => {
    try {
      for (const productId of productIds) {
        // Obtener datos del producto
        const { data } = await axios.get(`http://localhost:3001/products/${productId}`);
        const { isActive, name, price, image, brand, category, stock } = data;
  
        // Calcular el stock actualizado
        let updatedStock = stock - quantity;
        updatedStock = Math.max(updatedStock, 0);
  
        const newIsActive = determineIsActive(updatedStock, quantity);
  
        // Define isActive basado en el valor de updatedStock
        await axios.put(`http://localhost:3001/products/${productId}`, {
          isActive: newIsActive,
          name,
          price,
          image,
          brand,
          category,
          stock: updatedStock,
        });
  
        console.log(`El producto con ID: ${productId} ha sido actualizado con éxito`);
      }
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
