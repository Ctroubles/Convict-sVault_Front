import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Clients.module.css';

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.clientContainer}>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.searchInput}
          placeholder="Search by name"
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
                <th>Email</th>
                <th>Active</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td className={client.isActive ? style.onlineStatus : style.offlineStatus}>{client.isActive ? 'Activo' : 'Inactivo'}</td>
                  <td>{client._id}</td>
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
