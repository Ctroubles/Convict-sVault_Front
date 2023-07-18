import React, { useState } from 'react';
import axios from 'axios';

function PayUQueries() {
    console.log("hola1")
  const [orderId, setOrderId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [queryResult, setQueryResult] = useState('');

  const handleQueryByOrderId = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: true,
        language: 'en',
        command: 'ORDER_DETAIL',
        merchant: {
          apiLogin: 'iMs8HTQwddSM26Q',
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
        },
        details: {
          orderId: 857695047,
        },
      });
  
      // Extraer la información de la respuesta
      const orderDetails = response.data.result.payload;
  
      console.log('Detalles de la orden:', orderDetails);
      console.log('Estado de la orden:', orderDetails.status);
      console.log('Descripción de la orden:', orderDetails.description);
      console.log('Método de pago:', orderDetails.transactions[0].paymentMethod);
      console.log('Valor total de la orden:', orderDetails.additionalValues.TX_VALUE.value);
      // ... puedes extraer más información según tus necesidades
    } catch (error) {
      console.error('Error al consultar por Id de orden:', error);
    }
  };
  
  const handleQueryByTransactionId = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: true,
        language: 'en',
        command: 'TRANSACTION_RESPONSE_DETAIL',
        merchant: {
          apiLogin: 'iMs8HTQwddSM26Q',
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
        },
        details: {
          transactionId: '5fde3c2c-540d-4579-96f7-2a4b8c65a951',
        },
      });
  
      // Extraer la información de la respuesta
      const transactionDetails = response.data.result.payload;
  
      console.log('Detalles de la transacción:', transactionDetails);
      console.log('Estado de la transacción:', transactionDetails.state);
      console.log('Código de respuesta:', transactionDetails.responseCode);
      console.log('Código de autorización:', transactionDetails.authorizationCode);
      console.log('Mensaje de respuesta:', transactionDetails.responseMessage);
      console.log('Fecha de operación:', new Date(transactionDetails.operationDate));
      // ... puedes extraer más información según tus necesidades
    } catch (error) {
      console.error('Error al consultar por Id de transacción:', error);
    }
  };
  

  const handleQueryByReferenceCode = async () => {
    console.log("hola3")
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: true,
        language: 'es',
        command: 'ORDER_DETAIL_BY_REFERENCE_CODE',
        merchant: {
          apiLogin: 'iMs8HTQwddSM26Q',
          apiKey: 'HiegJInt6vSG6V6RqAbH6aATjT',
        },
        details: {
          referenceCode: referenceCode,
        },
      });
      setQueryResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error querying by Reference Id:', error);
    }
  };

  return (
    <div>
      <h2>Queries API</h2>
      <div>
        <h3>Query by Order Id</h3>
        <label>Order Id:</label>
        <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <button onClick={handleQueryByOrderId}>Query</button>
      </div>
      <div>
        <h3>Query by Transaction Id</h3>
        <label>Transaction Id:</label>
        <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
        <button onClick={handleQueryByTransactionId}>Query</button>
      </div>
      <div>
        <h3>Query by Reference Code</h3>
        <label>Reference Code:</label>
        <input type="text" value={referenceCode} onChange={(e) => setReferenceCode(e.target.value)} />
        <button onClick={handleQueryByReferenceCode}>Query</button>
      </div>
      <div>
        <h3>Query Result:</h3>
        <pre>{queryResult}</pre>
      </div>
    </div>
  );
}

export default PayUQueries;
