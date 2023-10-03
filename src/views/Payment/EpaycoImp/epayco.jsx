import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Epayco = () => {


  const [nombre, setNombre] = useState('');


  const apiKey = 'e95deec204ee959cd0fad3b4c2082d54';
  const privateKey = 'e244fdc8a0b2b994132f2b1b9baf9692';

  // useEffect(() => {
  //     window.ePayco.checkout.configure({
  //       key: apiKey,
  //       test: false,
  //     });
  // }, [apiKey, privateKey]);

  const getSessionId = async () => {
    try {
      const response = await axios.post('http://localhost:3001/session',{
          response: "https://www.superreoy.com/home",
          confirmation: "https://www.superreoy.com/home",
          name: "zapatos",
          invoice: "prueba 132",
          description: "Compra tennis",
          currency: "cop",
          amount: "55000",
          country: "CO",
          test: "true",
          ip: "186.97.212.162"
        
      })

      const {data} = await response;
      console.log(data);
      const sessionId = data.sessionId;
      console.log(sessionId);
      return sessionId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const pagar = async () => {

    const sessionId = await getSessionId();
    if (sessionId) {

      
      const handler = window.ePayco.checkout.configure({
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
