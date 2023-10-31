import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Url_deploy_back from '../../../util/deploy_back';
import { v4 as uuidv4 } from 'uuid';


const Epayco = ({ sessionId, loading, items, total, formRef, setErrors }) => {
  console.log("first", sessionId)
  const apiKey = 'e95deec204ee959cd0fad3b4c2082d54';
  const privateKey = 'e244fdc8a0b2b994132f2b1b9baf9692';
  const description = items
  .map((item) => {
    const { name, quantity } = item;
    return `Nombre: ${name} (Cantidad: ${quantity})`;
  })
  .join(", ");


console.log('Descripción de la compra:', description);
  useEffect(() => {
    const pagarAutomatically = async () => {
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

    pagarAutomatically();
  }, [apiKey, privateKey, sessionId]);

  const getSessionId = async () => {
    try {
      const invoiceNumber = uuidv4();
      const response = await axios.post(`${Url_deploy_back}/session`, {
        response: 'http://localhost:3000/home',
        confirmation: 'http://localhost:3000/home',
        name:"default name" || items[0].name,
        invoice: `Pago ${invoiceNumber}`,
        description: `compra con epayco ${description}`,
        currency: 'cop',
        amount: total,
        country: 'CO',
        test: 'true',
        ip: '186.97.212.162',
      });

      console.log(response.data)

      const { data } = await response;
      const sessionId = data.sessionId;
      console.log(sessionId);
      return sessionId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return null;
};

export default Epayco;