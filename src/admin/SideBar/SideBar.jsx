import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.css';
import { FaRegChartBar, FaShoppingCart, FaUserEdit } from 'react-icons/fa';

function SideBar({ darkMode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 965);
    }

    window.addEventListener('resize', handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${style.sidebar} ${darkMode ? style.darkMode : ''} ${showSidebar ? style.show : ''}`}>
      <ul className={style.ulist}>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/products"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaShoppingCart className={style.icon} />
            {!isMobile && !showSidebar && <span className={style.labelHidden}>Productos</span>}
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/sales"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaRegChartBar className={style.icon} />
            {!isMobile && !showSidebar &&<span className={style.labelHidden}>Ventas</span>}
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/clients"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaUserEdit className={style.icon} />
            {!isMobile && !showSidebar && <span className={style.labelHidden}>Clientes</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;