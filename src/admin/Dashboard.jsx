import React from 'react'
import style from "./Dashboard.module.css";
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import Sales from "../../src/admin/Sales/Sales"
import Clients from "../../src/admin/Clients/Clients"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Products from './Productos/Products';


function Dashboard() {
  return (
      <Router>
    <div className={style.dashboardContainer}>
        <nav>
          <h1 className={style.adminTitle}>SuperReo Y+</h1>
        <SideBar/>
        <Route exact path="/dashboard/sales" component={Sales} />
        <Route exact path="/dashboard/clients" component={Clients} />
        <Route exact path="/dashboard/products" component={Products} />
        </nav>
    </div>
      </Router>
  )
}

export default Dashboard;
