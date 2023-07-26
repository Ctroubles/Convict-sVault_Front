import React, { useEffect } from 'react';

function Epayco() {
  useEffect(() => {
    fetch(`http://localhost:3001/session`, {
      method: 'POST',
      body: JSON.stringify({
        // ...params_transaction son los parámetros que necesitas enviar en la solicitud
        // Asegúrate de incluir todos los parámetros requeridos según la documentación de ePayco
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(({ sessionId }) => {
        const handler = ePayco.checkout.configure({
          sessionId,
          external: false // Cambia a true para usar checkout externo
        });

        // Abre el checkout
        handler.openNew();
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Aplicación React.js</h1>
    </div>
  );
}

export default Epayco;
