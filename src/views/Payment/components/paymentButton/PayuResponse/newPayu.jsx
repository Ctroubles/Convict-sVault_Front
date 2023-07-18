import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert2';

function PayUCheckout() {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const referenceCode = `PAGO${uuidv4()}`;

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', {
        // Datos de la solicitud de pago
        merchantId: '508029',
        accountId: '512321',
        referenceCode: referenceCode,
        description: 'DESCRIPCION_DEL_PAGO',
        amount: 100.00,
        currency: 'COP',
        buyerEmail: 'kevinacr17@gmail.com',
        // Otros campos necesarios según tus requerimientos

        // Campos para capturar el pago
        capture: true,
        // Otros campos necesarios para la captura del pago
      });

      // Obtener la URL de pago del response
      const { paymentUrl } = response.data;

      // Redireccionar al usuario a la página de pago de PayU
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      // Mostrar alerta de error
      swal.fire({
        title: 'Error al procesar el pago',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timerProgressBar: 3000
      });
    }
  };

  return (
    <div>
      <h1>Pago con PayU</h1>
      {paymentUrl ? (
        <p>Se ha generado el enlace de pago: <a href={paymentUrl}>{paymentUrl}</a></p>
      ) : (
        <button onClick={handlePayment}>Realizar Pago</button>
      )}
    </div>
  );
}

export default PayUCheckout;
