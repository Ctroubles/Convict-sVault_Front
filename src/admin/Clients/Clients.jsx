import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Clients.module.css';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';

function Clients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

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
                <th>Name</th>
                <th>surname</th>
                <th>Email</th>
                <th>ID</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id}>
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
      </div>
    </div>
  );
}

export default Clients;
