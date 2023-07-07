import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from "./SideBar.module.css";
import { FaRegChartBar, FaShoppingCart, FaUserEdit } from "react-icons/fa";

function SideBar({darkMode }) {

  const [showSidebar, setShowSidebar] = useState(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <div className={`${style.sidebar} ${darkMode ? style.darkMode : ''} ${showSidebar ? style.show : ''}`}>
      <button className={style.menuButton} onClick={toggleSidebar}>
      <div className={style.bar}></div>
      <div className={style.bar}></div>
      <div className={style.bar}></div>
    </button>
      <ul className={style.ulist}>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/products"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaShoppingCart className={style.icon} />
            <span className={style.label}>Productos</span>
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/sales"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaRegChartBar className={style.icon} />
            <span className={style.label}>Ventas</span>
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/clients"
            activeClassName={style.activeButton}
            className={style.optionsSide}
          >
            <FaUserEdit className={style.icon} />
            <span className={style.label}>Clientes</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
