import React from 'react'
import style from "./Dashboard.module.css";
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import Sales from "../../src/admin/Sales/Sales"
import Clients from "../../src/admin/Clients/Clients"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Products from './Productos/Products';
import CreateProduct from './CreateProduct/CreateProduct';

function Dashboard() {
  return (
      <Router>
    <div className={style.dashboardContainer}>
        <nav>
          <div>
            <h1 className={style.adminTitle}>SuperReo Y+</h1>
          </div>
          <div style={{display:"flex"}}>
              <div>
                <SideBar/>
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
  )
}

export default Dashboard;
