import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert2';
import CryptoJS from 'crypto-js';



function PayUCheckout() {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const referenceCode = `PAGO${uuidv4()}`;
  let apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
  let merchantId = "508029";
  let mont = 100;

  let signature = CryptoJS.MD5(apiKey + "~" + merchantId + "~" + referenceCode + "~" + mont + "~COP").toString();

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', {
        language: 'es',
        command: 'SUBMIT_TRANSACTION',
        merchant: {
          apiKey: '4Vj8eK4rloUd272L48hsrarnUA',
          apiLogin: 'iMs8HTQwddSM26Q'
        },
        transaction: {
          order: {
            accountId: '512321',
            referenceCode: referenceCode,
            description: 'Payment test description',
            language: 'es',
            signature: signature,
            notifyUrl: 'http://www.payu.com/notify',
            additionalValues: {
              TX_VALUE: {
                value: 65000,
                currency: 'COP'
              }
            },
            buyer: {
              merchantBuyerId: '1',
              fullName: 'First name and second buyer name',
              emailAddress: 'buyer_test@test.com',
              contactPhone: '7563126',
              dniNumber: '123456789',
              shippingAddress: {
                street1: 'Cr 23 No. 53-50',
                street2: '5555487',
                city: 'Bogotá',
                state: 'Bogotá D.C.',
                country: 'CO',
                postalCode: '000000',
                phone: '7563126'
              }
            },
            shippingAddress: {
              street1: 'Cr 23 No. 53-50',
              street2: '5555487',
              city: 'Bogotá',
              state: 'Bogotá D.C.',
              country: 'CO',
              postalCode: '0000000',
              phone: '7563126'
            }
          },
          payer: {
            merchantPayerId: '1',
            fullName: 'First name and second payer name',
            emailAddress: 'payer_test@test.com',
            contactPhone: '7563126',
            dniNumber: '5415668464654',
            billingAddress: {
              street1: 'Cr 23 No. 53-50',
              street2: '125544',
              city: 'Bogotá',
              state: 'Bogotá D.C.',
              country: 'CO',
              postalCode: '000000',
              phone: '7563126'
            }
          },
          creditCard: {
            number: '4037997623271984',
            securityCode: '321',
            expirationDate: '2030/12',
            name: 'APPROVED'
          },
          extraParameters: {
            INSTALLMENTS_NUMBER: 1
          },
          type: 'AUTHORIZATION_AND_CAPTURE',
          paymentMethod: 'VISA',
          paymentCountry: 'CO',
          deviceSessionId: 'vghs6tvkcle931686k1900o6e1',
          ipAddress: '127.0.0.1',
          cookie: 'pt1t38347bs6jc9ruv2ecpv7o2',
          userAgent: 'Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0',
          threeDomainSecure: {}
        }
      }, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json'
        }
      });
      
      // Obtener la URL de pago del response
      const { paymentUrl } = response.data;

      // Actualizar el estado con la URL de pago
      setPaymentUrl(paymentUrl);

      // Redireccionar al usuario a la página de pago de PayU
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      // Mostrar alerta de error
      swal.fire({
        title: 'Error al procesar el pago',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        timerProgressBar: 3000
      });
    }
  };

  return (
    <div>
      <h1>Pago con PayU</h1>
      {paymentUrl ? (
        <p>Se ha generado el enlace de pago: <a href={paymentUrl}>{paymentUrl}</a></p>
      ) : (
        <button onClick={handlePayment}>Realizar Pago</button>
      )}
    </div>
  );
}

export default PayUCheckout;
