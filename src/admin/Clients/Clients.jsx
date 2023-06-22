import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Clients.module.css';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';

function Clients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [clientsPerPage] = useState(13);
const [sortDirection, setSortDirection] = useState('asc');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/db');
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Guardar la lista de clientes en el almacenamiento local del navegador
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    // Recuperar la lista de clientes desde el almacenamiento local del navegador al cargar la página
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar la página actual a la primera al realizar una nueva búsqueda
  };
  const handleRevoke = async (client) => {
    try {
      await axios.put(`http://localhost:3001/users/activate/${client._id}`, { isActive: false });

      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isActive: false };
        }
        return c;
      });
      setClients(updatedClients);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestore = async (client) => {
    try {
      await axios.put(`http://localhost:3001/users/activate/${client._id}`, { isActive: true });

      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isActive: true };
        }
        return c;
      });
      setClients(updatedClients);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredClients = clients
  .filter((client) => client.name?.toLowerCase().includes(searchTerm?.toLowerCase()))
  .sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortDirection === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className={style.clientContainer}>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.searchInput}
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className={style.tableContainer}>
        {clients.length === 0 ? (
          <div className={style.tableOverlay}>
            <p className={style.tableOverlayMessage}>No clients found</p>
          </div>
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>surname</th>
                <th>Email</th>
                <th>ID</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredClients
          .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
          .map((client, index) => (
                <tr key={client._id}>
                  <td>{(currentPage - 1) * clientsPerPage + index + 1}</td>
                  <td>{client.name}</td>
                  <td>{client.surname}</td>
                  <td>{client.email}</td>
                  <td>{client._id}</td>
                  <td className={client.isActive ? style.onlineStatus : style.offlineStatus}>
                    {client.isActive ? 'Activo' : 'Inactivo'}
                  </td>
                  <td>
                    {client.isActive ? (
                      <button onClick={() => handleRevoke(client)} className={style.deleteButton}>
                        <FaTrash /> Desactivar
                      </button>
                    ) : (
                      <button onClick={() => handleRestore(client)} className={style.restoreButton}>
                        <FaUndo /> Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        )}
        <div className={style.pagination}>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Anterior
  </button>
  <button
    disabled={currentPage * clientsPerPage >= filteredClients.length}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Siguiente
  </button>
</div>
      </div>
    </div>
  );
}

export default Clients;
