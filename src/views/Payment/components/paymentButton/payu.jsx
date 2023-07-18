import React, { useEffect, useRef } from 'react';
import style from "./paymentButton.module.css";
import { v4 as uuidv4 } from 'uuid';
import { validatorsLevel2 } from '../../validators';
import Url_deploy_back from '../../../../util/deploy_back';
import PayU from "payu";
const CryptoJS = require("crypto-js");

function PAYU({ total, user, formRef, setErrors, items }) {
  const formRef2 = useRef(null);
  console.log(items);
  let apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  let merchantId = "508029";
  const referenceCode = `PAGO${uuidv4()}`;
  let mont = total;

  let signature = CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + mont + "~COP").toString();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatorsLevel2(setErrors, formRef.current)) {
      return;
    }

    try {
      const response = await fetch("https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/", {
        method: "POST",
        body: new FormData(formRef2.current),
      });

      // Process the response as needed
      console.log("hola", response);

      // Call PayU capture method
      const paymentId = response.paymentId; // Replace with the actual payment ID from the response
      const captureResponse = await PayU.capturePayment(paymentId);

      // Process the capture response as needed
      console.log(captureResponse);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  PayU.paymentsUrl = "https://api.payulatam.com/payments-api/";

  return (
    <div id={style.formCotainer}>
      <form onSubmit={handleSubmit} ref={formRef2}>
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
        <input name="confirmationUrl" type="hidden" value={`https://convict-s-vault-front.vercel.app/confirmation`}/>
        <input name="Submit" type="submit" value="Pagar con Payu" id={style.paymentButton} />  
        <input name="shippingAddress" type="hidden" value={formRef.current?.address} />
        <input name="shippingCity" type="hidden" value={formRef.current?.city} />
        <input name="shippingCountry" type="hidden" value="CO" />
      </form>
    </div>
  );
}

export default PAYU;