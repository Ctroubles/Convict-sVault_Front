import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Url_deploy_back from '../../../../util/deploy_back';
import axios from 'axios';

function PayUConfirmationPage() {
  const location = useLocation();
  const history = useHistory();
  console.log('URL completa:', location.search);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionState = '4';
    const responseCode = 'APPROVED';
    const transactionId = '449c2f8f-f46b-4779-a80b-e778c55ad7c7';
    const extra1 = 'ID: 649a258c3f7e8616142fe268 - Nombre: ssssss (Cantidad: 1)';
    const TX_VALUE = searchParams.get('TX_VALUE');

    console.log('transactionState:', transactionState);
    console.log('responseCode:', responseCode);

    // Realiza las acciones necesarias según el estado de la transacción y el código de respuesta
    if (transactionState === '4' && responseCode === 'APPROVED') {
      // Transacción confirmada exitosamente
      console.log('Transacción confirmada exitosamente');
      saveTransaction(transactionId, extra1, TX_VALUE); // Guardar transacción en la base de datos
      updateStockFromDescription(searchParams, transactionId); // Actualizar el stock de los productos
      history.push('/success'); // Redirige a la página de éxito
    } else {
      // Transacción fallida u otro caso
      console.log('Error al confirmar la transacción');
      history.push('/error'); // Redirige a la página de error
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
    const description = 'ID: 649a258c3f7e8616142fe268 - Nombre: ssssss (Cantidad: 1)';
    const productInfoArray = description.split(', ');

    productInfoArray.forEach(async (productInfo) => {
      const [productId, quantityString] = productInfo
        .replace('ID: ', '')
        .split(' - Nombre: ');

      const quantity = parseInt(/\(Cantidad: (\d+)\)/.exec(quantityString)[1], 10);

      if (!isNaN(quantity)) {
        // Verificar si el ID de transacción ya ha sido procesado
        if (localStorage.getItem(transactionId)) {
          console.log(`La actualización de stock para la transacción ${transactionId} ya ha sido procesada`);
          return;
        }

        await updateProductStock(productId, quantity, transactionId);

        // Almacenar el ID de transacción en el almacenamiento local para marcarlo como procesado
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
