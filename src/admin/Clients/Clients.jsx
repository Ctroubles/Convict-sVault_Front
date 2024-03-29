import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Clients.module.css';
import { FaEdit, FaTrash, FaUndo, FaCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Url_deploy_back from '../../util/deploy_back';


function Clients({darkMode}) {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const [clientsPerPage] = useState(13);
const [sortDirection, setSortDirection] = useState('asc');
const [filterActive, setFilterActive] = useState(true);
const [activeFilter, setActiveFilter] = useState('activos');
const [isMobile, setIsMobile] = useState(false);


/////////RESPONSIVE//////////////
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 800);
  };
  window.addEventListener('resize', handleResize);
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
/////////RESPONSIVE//////////////


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url_deploy_back}/users/db`);
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


  ///////////ADMIN/////////////
  const handleGiveAdmin = async (client) => {
    try {
      await axios.put(`${Url_deploy_back}/users/giveAdmin/${client._id}`);
      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isAdmin: true };
        }
        return c;
      });
      setClients(updatedClients);
      Swal.fire({
        icon: 'success',
        title: 'Se asigno el Rol admin',
        text: 'Felicidades ahora este usuario es admin',
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRemoveAdmin = async (client) => {
    try {
      await axios.put(`${Url_deploy_back}/users/removeAdmin/${client._id}`);
      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isAdmin: false };
        }
        return c;
      });
      setClients(updatedClients);
      Swal.fire({
        icon: 'success',
        title: 'Rol admin retirado',
        text: 'Se le quito el rol de admin satisfactoriamente',
      });
    } catch (error) {
      console.error(error);
    }
  };
    ///////////ADMIN/////////////

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar la página actual a la primera al realizar una nueva búsqueda
  };
  const handleRevoke = async (client) => {
    try {
      await axios.put(`${Url_deploy_back}/users/desactivate/${client._id}`);

      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isActive: false };
        }
        return c;
      });
      Swal.fire({
        icon: 'success',
        title: 'Se desactivo este usuario',
        text: 'Ahora este usuario esta desactivo',
      });
      setClients(updatedClients);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestore = async (client) => {
    try {
      await axios.put(`${Url_deploy_back}/users/activate/${client._id}`, { isActive: true });

      const updatedClients = clients.map((c) => {
        if (c._id === client._id) {
          return { ...c, isActive: true };
        }
        return c;
      });
      Swal.fire({
        icon: 'success',
        title: 'Se activo este usuario',
        text: 'Ahora este usuario esta disponible',
      });
      setClients(updatedClients);
    } catch (error) {
      console.error(error);
    }
  };


  const handleToggleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const filteredClients = clients
  .filter((client) => {
    if (activeFilter === 'activos') {
      return client.isActive;
    } else if (activeFilter === 'inactivos') {
      return !client.isActive;
    } else {
      return true; // Mostrar todos los clientes si no hay filtro activo o inactivo seleccionado
    }
  })
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
        <div className={style.filterButtons}>
        <button style={{marginLeft:'10px'}}
  className={`${style.filterButton} ${activeFilter === 'activos' ? style.activeFilterButton : ''}`}
  onClick={() => handleToggleFilter('activos')}
>
  Activos
</button>
<button
  className={`${style.filterButton} ${activeFilter === 'inactivos' ? style.activeFilterButton : ''}`}
  onClick={() => handleToggleFilter('inactivos')}
>
  Inactivos
</button>
        </div>
      </div>

      <div className={`${style.tableContainer} ${darkMode ? style.darkMode : ''}`}>
        {clients.length === 0 ? (
          <div className={style.tableOverlay}>
            <p className={style.tableOverlayMessage}>No clients found</p>
          </div>
        ) : (
          <div className="tableContainerInner">
    <table className={style.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Celular</th>
                <th>Email</th>
                {isMobile ? null : <th>ID</th>}
                <th>Accion</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
            {filteredClients
          .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
          .map((client, index) => (
                <tr key={client._id}>
                  <td>{(currentPage - 1) * clientsPerPage + index + 1}</td>
                  <td>{client.name || 'Sin nombre'}</td>
                  <td>{client.surname || 'Sin apellido'}</td>
                  <td>{client.phone ? client.phone : 'No disponible'}</td>
                  <td className={`${style.clientName}`}>{client.email}</td>
                  {isMobile ? null : <td>{client._id}</td>}
                    <td>
  {client.isActive ? (
    <button onClick={() => handleRevoke(client)} className={style.deleteButton}>
      {isMobile ? <FaTrash /> : <><FaTrash /></>}
    </button>
  ) : (
    <button onClick={() => handleRestore(client)} className={style.restoreButton}>
      {isMobile ? <FaUndo /> : <><FaUndo /></>}
    </button>
  )}
</td>
<td>
  {client.isAdmin ? (
    <button onClick={() => handleRemoveAdmin(client)} className={style.removeAdminButton}>
      {isMobile ? <FaUndo /> : <><FaUndo /></>}
    </button>
  ) : (
    <button onClick={() => handleGiveAdmin(client)} className={style.giveAdminButton}>
      {isMobile ? <FaEdit /> : <><FaEdit /></>}
      
    </button>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
         <div className={style.pagination}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
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
