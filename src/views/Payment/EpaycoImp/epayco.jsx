import React, { useState } from 'react';
import ePayco from 'epayco';

const Epayco = () => {
  const [nombre, setNombre] = useState('');

  const getSessionId = async () => {
    try {
      const response = await fetch('http://localhost:3001/session', {
        method: 'POST',
        body: JSON.stringify({
          name: "zapatos",
          invoice: "prueba 122",
          description: "Compra zaptos cantidad x1",
          currency: "cop",
          amount: "55000",
          country: "CO",
          test: "true",
          ip: "186.97.212.162"
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      const sessionId = data.sessionId;
      console.log(sessionId);
      return sessionId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const pagar = async () => {
    console.log(nombre);
    const sessionId = await getSessionId();
    if (sessionId) {
      const handler = ePayco.checkout.configure({
        sessionId,
        external: false,
        test: true,
      });
      handler.openNew();
    } else {
      console.log("Error al obtener el sessionId");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={pagar}>Pagar</button>
    </>
  );
};

export default Epayco;
