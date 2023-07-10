import React from 'react';
import dotenv from 'dotenv';
import md5 from 'js-md5';

dotenv.config();

const api_key = process.env.PAYU_API_KEY2;

function PAYU({total, user, items}) {
    // console.log(api_key)
    console.log(total)
    console.log(user.email)
    console.log(items[0]._id)
    const merchantId = '508029';
    const amount = total;
    const currency = 'COP';
    const referenceCode= `PAGO002`;

    const signatureString = `${api_key}~${merchantId}~${referenceCode}~${amount}~${currency}`;
    const signature = md5(signatureString);
    // console.log(signature)
  return (
    <div>
      <h1>
        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
          <input name="merchantId" type="hidden" value="508029" />
          <input name="accountId" type="hidden" value="512321" />
          <input name="description" type="hidden" value="VENTAS EN LINEA" />
          <input name="referenceCode" type="hidden" value={referenceCode} />
          <input name="amount" type="hidden" value={total} />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value="a8e440863ad8d6d67b1ac133a2ec2cc9" />
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
        </form>
      </h1>
    </div>
  );
}

export default PAYU;
