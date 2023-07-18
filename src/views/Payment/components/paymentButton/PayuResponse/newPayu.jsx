import React, { useEffect } from 'react';
import { PayU } from '@ingameltd/payu';

const PayuNew = () => {
  useEffect(() => {
    PayU.merchantId = "1"; 
    PayU.apiKey = "xxxxxxxxxxxx"; // Ingresa tu clave de API aquí
    PayU.apiLogin = "xxxxxxxxxxxx"; // Ingresa tu inicio de sesión de API aquí
    PayU.language = PayU.Language.es; // Ingresa el idioma aquí
    PayU.isTest = true; // Asigna true si estás en modo de prueba

    // https://sandbox.api.payulatam.com/payments-api/
    PayU.paymentsUrl = "https://sandbox.api.payulatam.com/payments-api/"; // Inclúyelo si deseas probar en un servidor de pagos específico y asigna su URL.
    // https://api.payulatam.com/reports-api/
    PayU.reportsUrl = "https://sandbox.api.payulatam.com/reports-api/"; // Inclúyelo si deseas probar en un servidor de informes específico y asigna su URL.
    

    PayU.setPaymentsCustomUrl("https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi");
    PayU.setReportsCustomUrl("https://sandbox.api.payulatam.com/reports-api/4.0/service.cgi");
    // Opcional: Configurar nivel de registro de PayU
    PayU.setLogLevel(PayU.LogLevel.ALL);
    
    // Ejemplo de uso: Realizar una petición a la API de PayU con parámetros
    const makePayURequest = async () => {
      try {
        const parameters = new Map();
        parameters.set(PayU.PARAMETERS.TRANSACTION_ID, transactionId);
        parameters.set(PayU.PARAMETERS.ORDER_ID, orderId.toString());

        const response = await PayU.createPayment(parameters);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    makePayURequest(); // Llama a la función para realizar la petición a PayU cuando el componente se monte
  }, []);

  return (
    <div>
      {/* Tu contenido JSX aquí */}
    </div>
  );
};

export default PayuNew;
