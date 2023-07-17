import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import style from './transactionHistory.module.css';
import Url_deploy_back from '../../util/deploy_back';
function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);
  const history = useHistory();

  useEffect(() => {
    fetch(`${Url_deploy_back}/transactions`)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error(error));
  }, []);

  const getStatusLabel = (state) => {
    switch (state) {
      case '4':
        return 'Aprobada';
      case '5':
        return 'Expirada';
      case '6':
        return 'Rechazada';
      case '7':
        return 'Pendiente';
      case '104':
        return 'Error';
      default:
        return 'Desconocido';
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage => currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  // Calcular índices para paginado
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Verificar si hay páginas anteriores o siguientes
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = indexOfLastTransaction < transactions.length;

  return (
    <div className={style.transactionHistoryContainer}>
      <h2>Historial de Transacciones</h2>
      <table className={style.transactionTable}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Total</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.transactionId}</td>
              <td>${transaction.total}</td>
              <td>{transaction.description}</td>
              <td>{getStatusLabel(transaction.state)}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
        </table>
      <div className={style.pagination}>
        <button onClick={handlePreviousPage} disabled={!hasPreviousPage}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={!hasNextPage}>
          Siguiente
        </button>
      </div>
      <button className={style.goBackButton} onClick={handleGoBack}>
        Volver
      </button>
    </div>
  );
}

export default TransactionHistory;