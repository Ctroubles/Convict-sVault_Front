import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import style from "./Dashboard.module.css";
import SideBar from './SideBar/SideBar';
import Sales from '../../src/admin/Sales/Sales';
import Clients from '../../src/admin/Clients/Clients';
import Products from './Productos/Products';
import CreateProduct from './CreateProduct/CreateProduct';
import logotipo from '../../src/assets/logorecortadoooooo (1).png';
import Home from '../../src/views/home/Home';

function Dashboard() {
  return (
    <Router>
      <div className={style.dashboardContainer}>
        <nav>
          <h1 className={style.titleDashboard}>
            <img src={logotipo} alt="" width="30px" />
            Super Reo Y+
          </h1>
          <div style={{ display: 'flex' }}>
            <div>
              <SideBar />
            </div>
            <div>
              <Route exact path="/dashboard/sales" component={Sales} />
              <Route exact path="/dashboard/clients" component={Clients} />
              <Route exact path="/dashboard/products" component={Products} />
              <Route exact path="/dashboard/products/create" component={CreateProduct} />
            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default Dashboard;