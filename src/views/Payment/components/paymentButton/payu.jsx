import React from 'react';
import md5 from 'js-md5';
import style from "./paymentButton.module.css"



function PAYU({total, user, items}) {

  const api_key = process.env.REACT_APP_PAYU_API_KEY2;

    const merchantId = '508029';
    const amount = total;
    const currency = 'COP';
    const referenceCode= `PAGO010`;

    const signatureString = (`${api_key}~${merchantId}~${referenceCode}~${amount}~${currency}`);
    const signature = md5(signatureString);

  console.log(signature)
    return (
      <div id={style.formCotainer}>
          <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
            <input name="merchantId" type="hidden" value="508029" />
            <input name="accountId" type="hidden" value="512321" />
            <input name="description" type="hidden" value="VENTAS EN LINEA" />
            <input name="referenceCode" type="hidden" value={referenceCode} />
            <input name="amount" type="hidden" value={total} />
            <input name="tax" type="hidden" value="0" />
            <input name="taxReturnBase" type="hidden" value="0" />
            <input name="currency" type="hidden" value="COP" />
            <input name="signature" type="hidden" value={signature} />
            <input name="test" type="hidden" value="1" />
            <input name="buyerEmail" type="hidden" value={user.email} />
            <input name="responseUrl" type="hidden" value="http://localhost:3000/response" />
            <input name="confirmationUrl" type="hidden" value="http://localhost:3000/confirmation" />
            <input name="Submit" type="submit" value="Pagar con Payu" id={style.paymentButton} />  
            <input name="shippingAddress"    type="hidden"  value="calle 93 n 47 - 65"   />
            <input name="shippingCity"       type="hidden"  value="Andes" />
            <input name="shippingCountry"    type="hidden"  value="CO"  />
          </form>
      </div>
    );
}

export default PAYU;