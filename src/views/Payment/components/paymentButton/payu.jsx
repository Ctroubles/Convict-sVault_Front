import React, { useState } from 'react';
import style from "./paymentButton.module.css"
import { v4 as uuidv4 } from 'uuid';
import { validatorsLevel2 } from '../../validators';
import Url_deploy_back from '../../../../util/deploy_back';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function PAYU({ total, user, formRef, setErrors, items }) {
  let apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  let merchantId = "508029";
  const referenceCode = `PAGO${uuidv4()}`;
  let mont = total;

  let signature = CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + mont + "~COP").toString();

  const [paymentId, setPaymentId] = useState('');

  const handleCapturePayment = async (paymentId) => {
    try {
      const response = await axios.post(
        `https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi/${paymentId}/capture`,
        {
          apiKey: apiKey,
          merchantId: merchantId,
          paymentId: paymentId,
          // Otros parámetros relevantes para la captura del pago
        }
      );

      // El pago se capturó exitosamente
      console.log('Pago capturado:', response.data);

      // Envía los datos del pago capturado a la base de datos
      const transactionData = {
        paymentId: paymentId,
        amount: response.data.amount,
        // Otros datos relevantes del pago que desees enviar a la base de datos
      };

      const databaseResponse = await axios.post(`${Url_deploy_back}/transactions/create`, transactionData);
      console.log('Pago enviado a la base de datos:', databaseResponse.data);
    } catch (error) {
      // Ocurrió un error al capturar el pago
      if (error.response && error.response.data) {
        console.error('Error al capturar el pago:', error.response.data);
      } else {
        console.error('Error al capturar el pago:', error.message);
      }
    }
  };

  const createPayment = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi/v2_1/payments', {
        // ... otros parámetros necesarios para crear el pago
      });
      const paymentId = response.data.id;
      setPaymentId(paymentId);
      console.log('Pago creado:', paymentId);
    } catch (error) {
      console.error('Error al crear el pago:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatorsLevel2(setErrors, formRef.current)) {
      return;
    }

    await createPayment();
    await handleCapturePayment(paymentId);
  };

  return (
    <div id={style.formCotainer}>
      <form onSubmit={handleSubmit}>
        <input name="merchantId" type="hidden" value="508029" />
        <input name="accountId" type="hidden" value="512321" />
        <input
          name="description"
          type="hidden"
          value={items
            .map((item) => {
              const { _id, name, quantity } = item;
              return `ID: ${_id} - Nombre: ${name} (Cantidad: ${quantity})`;
            })
            .join(", ")}
        />
        <input name="referenceCode" type="hidden" value={referenceCode} />
        <input name="amount" type="hidden" value={total} />
        <input name="tax" type="hidden" value="0" />
        <input name="taxReturnBase" type="hidden" value="0" />
        <input name="currency" type="hidden" value="COP" />
        <input name="signature" type="hidden" value={signature} />
        <input name="test" type="hidden" value="1" />
        <input name="buyerEmail" type="hidden" value={user.email} />
        <input name="responseUrl" type="hidden" value={`https://convict-s-vault-front.vercel.app/response`} />
        <input name="payerFullName" type="hidden" value={formRef.current?.name} />
        <input name="payerMobilePhone" type="hidden" value={user.phone} />
        <input name="payerDocument" type="hidden" value={user.dni} />
        <input name="confirmationUrl" type="hidden" value={`https://convict-s-vault-front.vercel.app/confirmation`} />
        <input name="Submit" type="submit" value="Pagar con Payu" id={style.paymentButton} />
        <input name="shippingAddress" type="hidden" value={formRef.current?.address} />
        <input name="shippingCity" type="hidden" value={formRef.current?.city} />
        <input name="shippingCountry" type="hidden" value="CO" />
      </form>
    </div>
  );
}

export default PAYU;
