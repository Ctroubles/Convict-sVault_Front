import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from "./SideBar.module.css";
import { FaRegChartBar, FaShoppingCart, FaUserEdit } from "react-icons/fa";

function SideBar() {

  return (
    <div className={style.sidebar}>
      <ul className={style.ulist}>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/products"
          >
            <FaShoppingCart className={style.icon} />
            <span className={style.label}>Productos</span>
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/sales"
            activeClassName={style.active}
          >
            <FaRegChartBar className={style.icon} />
            <span className={style.label}>Ventas</span>
          </NavLink>
        </li>
        <li className={style.buttons}>
          <NavLink
            to="/dashboard/clients"
            activeClassName={style.active}
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
