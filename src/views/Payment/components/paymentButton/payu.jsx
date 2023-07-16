import React from 'react';
import style from "./paymentButton.module.css"
import { v4 as uuidv4 } from 'uuid';
import { validatorsLevel2 } from '../../validators';

const CryptoJS = require("crypto-js");


function PAYU({total, user, formRef, setErrors, items}) {

  let apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  let merchantId = "508029";
  const referenceCode = `PAGO${uuidv4()}`;
  let mont = total;

  let signature = CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + mont + "~COP").toString();
    
  const handleSubmit = (event) => {
    if (!validatorsLevel2(setErrors,formRef.current)) {
      event.preventDefault(); 
      return;
    }
  };

  
    return (
      <div id={style.formCotainer}>
          <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" onSubmit={handleSubmit}>
            <input name="merchantId" type="hidden" value="508029" />
            <input name="accountId" type="hidden" value="512321" />
            <input name="description" type="hidden" value={`${items[0].name} x ${items[0].quantity}`} />
            <input name="referenceCode" type="hidden" value={referenceCode} />
            <input name="amount" type="hidden" value={total} />
            <input name="tax" type="hidden" value="0" />
            <input name="taxReturnBase" type="hidden" value="0" />
            <input name="currency" type="hidden" value="COP" />
            <input name="signature" type="hidden" value={signature} />
            <input name="test" type="hidden" value="1" />
            <input name="buyerEmail" type="hidden" value={user.email} />
            <input name="responseUrl" type="hidden" value="http://localhost:3000/response" />
            <input name="payerFullName" type="hidden" value={formRef.current?.name} />
            <input name="payerMobilePhone" type="hidden" value={user.phone} />
            <input name="payerDocument" type="hidden" value={user.dni} />
            <input name="confirmationUrl" type="hidden" value="http://localhost:3000/confirmation" />
            <input name="Submit" type="submit" value="Pagar con Payu" id={style.paymentButton} />  
            <input name="shippingAddress"    type="hidden"  value={formRef.current?.address}   />
            <input name="shippingCity"       type="hidden"  value={formRef.current?.city} />
            <input name="shippingCountry"    type="hidden"  value="CO" />
          </form>
      </div>
    );
}

export default PAYU;