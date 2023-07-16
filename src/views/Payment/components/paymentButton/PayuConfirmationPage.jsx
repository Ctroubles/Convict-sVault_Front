import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function PayUConfirmationPage() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionState = searchParams.get('transactionState');
    const responseCode = searchParams.get('responseCode');

    console.log('transactionState:', transactionState);
    console.log('responseCode:', responseCode);

    // Realiza las acciones necesarias según el estado de la transacción y el código de respuesta
    if (transactionState === 'APPROVED') {
      // Transacción confirmada exitosamente
      console.log('Transacción confirmada exitosamente');
      history.push('/success'); // Redirige a la página de éxito
    } else {
      // Transacción fallida u otro caso
      console.log('Error al confirmar la transacción');
      history.push('/error'); // Redirige a la página de error
    }
  }, [location.search, history]);

  return (
    <div>
      <h2>Confirmación de transacción PayU</h2>
    </div>
  );
}

export default PayUConfirmationPage;
