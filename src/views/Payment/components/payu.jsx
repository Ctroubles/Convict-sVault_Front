import React from 'react';

function PAYU({total, user, item}) {
    console.log(total)
    console.log(user.email)
  return (
    <div>
      <h1>
        <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
          <input name="merchantId" type="hidden" value="508029" />
          <input name="accountId" type="hidden" value="512321" />
          <input name="description" type="hidden" value="VENTAS EN LINEA" />
          <input name="referenceCode" type="hidden" value="PAGO001" />
          <input name="amount" type="hidden" value={total} />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value="6d0e7e460b604a3485d8d83a9c5667fb" />
          <input name="test" type="hidden" value="1" />
          <input name="buyerEmail" type="hidden" value={user.email} />
          <input name="responseUrl" type="hidden" value="http://localhost:3000/response" />
          <input name="confirmationUrl" type="hidden" value="http://localhost:3000/confirmation" />
          <input name="Submit" type="submit" value="Pagar" />
        </form>
      </h1>
    </div>
  );
}

export default PAYU;
