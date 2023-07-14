import React, { useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import styles from './PayuResponse.module.css';

const CryptoJS = require("crypto-js");

function PayUResponseSummary() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionState = searchParams.get('transactionState');
    const responseCode = searchParams.get('responseCode');

    // Realiza las acciones necesarias según el estado de la transacción y el código de respuesta
    // Puedes redirigir al usuario a una página de éxito, error, etc.
    if (transactionState === 'APPROVED') {
      // Transacción aprobada exitosamente
      // history.push('/confirmation');
    } else {
      // Transacción fallida u otro caso
      // history.push('/error');
    }
  }, [location.search, history]);
  const searchParams = new URLSearchParams(location.search);
  const TX_VALUE = searchParams.get('TX_VALUE');
  const transactionState = searchParams.get('transactionState');
  const cus = searchParams.get('cus');
  const extra1 = searchParams.get('description');
  const transactionId = searchParams.get('transactionId');
  const processingDate = searchParams.get('processingDate');
  let estadoTx = '';

  if (transactionState === '4') {
    estadoTx = 'Transacción aprobada';
    
  } else if (transactionState === '5') {
    estadoTx = 'Transacción expirada';
  } else if (transactionState === '6') {
    estadoTx = 'Transacción rechazada';
  } else if (transactionState === '7') {
    estadoTx = 'Pago pendiente';
  } else if (transactionState === '104') {
    estadoTx = 'Error';
  }  else {
    estadoTx = searchParams.get('mensaje');
  }

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <h2>Resumen de la transacción</h2>
        <table>
          <tbody>
            <tr>
              <td>Estado de la transacción</td>
              <td>{estadoTx}</td>
            </tr>
            <tr>
              <td>ID de la transacción</td>
              <td>{transactionId}</td>
            </tr>
            <tr>
              <td>Fecha</td>
              <td>{processingDate}</td>
            </tr>
            <tr>
              <td>Valor total</td>
              <td>${TX_VALUE}</td>
            </tr>
            <tr>
              <td>Descripción</td>
              <td>{extra1}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/home" className={styles.buttonToHome}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default PayUResponseSummary;
