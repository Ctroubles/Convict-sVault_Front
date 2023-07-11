import React from 'react';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

const CryptoJS = require("crypto-js");

dotenv.config();

const api_key = process.env.PAYU_API_KEY2;

function PAYU({total, user, items}) {
    console.log(total)
    console.log(user.email)

let apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
let merchantId = "508029";
let referenceCode = `PAGO${uuidv4()}`;
let mont = total;

let signature = CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + mont + "~COP").toString();
console.log(signature)
  return (
    <div>
      <h1>
        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
          <input name="merchantId" type="hidden" value="508029" />
          <input name="accountId" type="hidden" value="512321" />
          <input name="description" type="hidden" value="VENTAS EN LINEA" />
          <input name="referenceCode" type="hidden" value={referenceCode} />
          <input name="amount" type="hidden" value={mont} />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value={signature} />
          <input name="test" type="hidden" value="1" />
          <input name="buyerEmail" type="hidden" value={user.email} />
          <input name="responseUrl" type="hidden" value="http://localhost:3000/response" />
          <input name="confirmationUrl" type="hidden" value="http://localhost:3000/confirmation" />
          <input
                name="Submit"
                type="submit"
                value="Pagar con Payu"
                style={{
                    backgroundColor: '#0558b0',
                    color: 'white',
                    fontSize: '20px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    width: "350px",
                    
                    }}
                />  
        <input name="shippingAddress"    type="hidden"  value="calle 93 n 47 - 65"   />
        <input name="shippingCity"       type="hidden"  value="Andes" />
        <input name="shippingCountry"    type="hidden"  value="CO"  />
        </form>
      </h1>
    </div>
  );
}

export default PAYU;