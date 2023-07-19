import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Url_deploy_back from '../../../../util/deploy_back';
import axios from 'axios';

function PayUConfirmationPage() {
  const location = useLocation();
  const history = useHistory();
  console.log('URL completa:', location.search);
  const searchParams = new URLSearchParams(location.search);
  const transactionState = searchParams.get("transactionState");
  const polResponseCode = searchParams.get("polResponseCode");
  const transactionId = searchParams.get("transactionId");
  const extra1 = searchParams.get("despcription");
  const TX_VALUE = searchParams.get('TX_VALUE');

    useEffect(() => {
        if (transactionState === '4' && polResponseCode === '1') {

          console.log('Transacción confirmada exitosamente');
          saveTransaction(transactionId, extra1, TX_VALUE); 
          updateStockFromDescription(searchParams, transactionId); 
        } else {
          history.push('/error'); 

        }
    }, [location.search, history]);

  const saveTransaction = async (transactionId, extra1, TX_VALUE) => {
    try {
      const response = await fetch(`${Url_deploy_back}/transactions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          total: TX_VALUE,
          description: extra1,
          state: 'APPROVED',
        }),
      });
      if (response.ok) {
        console.log('Transacción guardada en la base de datos');
      } else {
        console.error('Error al guardar la transacción en la base de datos');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error.message);
    }
  };

  const updateStockFromDescription = (searchParams, transactionId) => {
    const description = extra1;
    const productInfoArray = description.split(', ');

    productInfoArray.forEach(async (productInfo) => {
      const [productId, quantityString] = productInfo
        .replace('ID: ', '')
        .split(' - Nombre: ');

      const quantity = parseInt(/\(Cantidad: (\d+)\)/.exec(quantityString)[1], 10);

      if (!isNaN(quantity)) {

        if (localStorage.getItem(transactionId)) {
          console.log(`La actualización de stock para la transacción ${transactionId} ya ha sido procesada`);
          return;
        }

        await updateProductStock(productId, quantity, transactionId);
        localStorage.setItem(transactionId, 'processed');

      }
    });
  };

  const updateProductStock = async (productId, quantity, transactionId) => {
    try {
      // Obtener datos del producto
      const { data } = await axios.get(`${Url_deploy_back}/products/${productId}`);
      const { name, price, image, brand, category, stock } = data;

      // Actualizar el stock
      let updatedStock = stock - quantity;
      updatedStock = Math.max(updatedStock, 0);
      console.log(updatedStock)

      // Realizar la solicitud PUT para actualizar el stock del producto
      await axios.put(`${Url_deploy_back}/products/${productId}`, {
        name,
        price,
        image,
        brand,
        category,
        stock: updatedStock,
      });

    } catch (error) {
      console.error('Error al actualizar el stock del producto:', error.message);
    }
  };

  return (
    <div>
      <h2>Confirmación de transacción PayU</h2>
    </div>
  );
}

export default PayUConfirmationPage;
