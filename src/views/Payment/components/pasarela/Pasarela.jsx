import { useState } from "react";
import style from "./Pasarela.module.css"
import axios from "axios";
import CryptoJS from 'crypto-js';


const Pasarela = () =>{

    const [formPay, setformPay] = useState({
        reference:"",
        card:"376414000000009",
        cvv:"777",
    })


    const handlerChange = ({target}) =>{
        setformPay({...formPay, [target.name]:target.value})
    }


    const submitHandler = async() =>{

        const referenceCode = formPay.reference;

        const PAYU_APY_KEY = process.env.REACT_APP_PAYU_APY_KEY;
        const PAYU_MERCHANT_ID = process.env.REACT_APP_PAYU_MERCHANT_ID;

        let signature = CryptoJS.MD5( PAYU_APY_KEY + "~" + PAYU_MERCHANT_ID + "~" + referenceCode + "~" + 65000 + "~COP").toString();


        const requestData = {
            language: 'es',
            command: 'SUBMIT_TRANSACTION',
            merchant: {
              apiKey: PAYU_APY_KEY,
              apiLogin: process.env.REACT_APP_PAYU_API_LOGIN,
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
                    currency: 'COP',
                  },
                  TX_TAX: {
                    value: 10378,
                    currency: 'COP',
                  },
                  TX_TAX_RETURN_BASE: {
                    value: 54622,
                    currency: 'COP',
                  },
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
                    phone: '7563126',
                  },
                },
                shippingAddress: {
                  street1: 'Cr 23 No. 53-50',
                  street2: '5555487',
                  city: 'Bogotá',
                  state: 'Bogotá D.C.',
                  country: 'CO',
                  postalCode: '0000000',
                  phone: '7563126',
                },
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
                  phone: '7563126',
                },
              },
              creditCard: {
                number: formPay.card,
                securityCode: formPay.cvv,
                expirationDate: '2030/12',
                name: 'APPROVED',
              },
              extraParameters: {
                INSTALLMENTS_NUMBER: 1,
              },
              type: 'AUTHORIZATION_AND_CAPTURE',
              paymentMethod: 'AMEX',
              paymentCountry: 'CO',
              deviceSessionId: 'vghs6tvkcle931686k1900o6e1',
              ipAddress: '127.0.0.1',
              cookie: 'pt1t38347bs6jc9ruv2ecpv7o2',
              userAgent: 'Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0',
              threeDomainSecure: {
                embedded: false,
                eci: '01',
                cavv: 'AOvG5rV058/iAAWhssPUAAADFA==',
                xid: 'Nmp3VFdWMlEwZ05pWGN3SGo4TDA=',
                directoryServerTransactionId: '00000-70000b-5cc9-0000-000000000cb',
              },
            },
            test: true,
        };

        const requestConfig = {
        headers: {
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*', 
        },
        };
        try {

            const response = await axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', requestData, requestConfig);
            console.log(response);

          } catch (error) {
            console.log(error);
          }     

    }


    return(
        <div>
            <div>
                <header id={style.header}>
                    <div className={style.container}>
                        <div>
                            <div id={style.securePayment}>
                                <span></span>
                                <span>Pago seguro con</span>
                                <img src="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/cld/public/dist/images/icon-print/logo.png" alt="" />
                            </div>
                        </div>
                    </div>
                </header>
                <div>
                    <div id={style.noticeBox}>
                        <div>
                            <h2>
                                Transacción de pago pendiente
                            </h2>
                        </div>
                    </div>
                </div>
                <main>
                    <div id={style.main}>
                        <div className={style.container}>
                            <div>
                                <div>
                                    <div></div>
                                    <div>
                                        <input type="text" name="" id="" />
                                    </div>
                                </div>
                                <div>
                                    <div>reference:</div>
                                    <div>
                                        <input type="text" name="reference" id="reference" value={formPay.reference} onChange={(e)=>handlerChange(e)} />
                                    </div>
                                </div>
                                <div>
                                    <div>numero de tarjeta:</div>
                                    <div>
                                        <input type="text" name="card" id="card" value={formPay.card} onChange={(e)=>handlerChange(e)}/>
                                    </div>
                                </div>
                                <div>
                                    <div>cvv:</div>
                                    <div>
                                        <input type="password" name="cvv" id="cvv" value={formPay.cvv} onChange={(e)=>handlerChange(e)} />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={()=>submitHandler()}>PAGAR</button>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </main>
            </div>
        </div>
    )
};


export default Pasarela;