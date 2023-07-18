import React, { useState } from 'react';
import axios from 'axios';

function PayUQueries() {
  const [orderId, setOrderId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [queryResult, setQueryResult] = useState('');

  const handleQueryByOrderId = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: false,
        language: 'en',
        command: 'ORDER_DETAIL',
        merchant: {
          apiLogin: 'iMs8HTQwddSM26Q',
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
        },
        details: {
          orderId: orderId,
        },
      });
      setQueryResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error querying by Order Id:', error);
    }
  };

  const handleQueryByTransactionId = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: false,
        language: 'en',
        command: 'TRANSACTION_RESPONSE_DETAIL',
        merchant: {
          apiLogin: 'pRRXKOl8ikMmt9u',
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
        },
        details: {
          transactionId: transactionId,
        },
      });
      setQueryResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error querying by Transaction Id:', error);
    }
  };

  const handleQueryByReferenceCode = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi', {
        test: false,
        language: 'en',
        command: 'ORDER_DETAIL_BY_REFERENCE_CODE',
        merchant: {
          apiLogin: 'pRRXKOl8ikMmt9u',
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
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
