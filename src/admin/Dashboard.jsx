import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import style from "./Dashboard.module.css";
import SideBar from './SideBar/SideBar';
import Sales from '../../src/admin/Sales/Sales';
import Clients from '../../src/admin/Clients/Clients';
import Products from './Productos/Products';
import CreateProduct from './CreateProduct/CreateProduct';
import { Link } from 'react-router-dom';
import logotipo from '../../src/assets/logooblancoobeja.png';
import Home from '../../src/views/home/Home';
import { FaSun, FaMoon } from 'react-icons/fa';





function Dashboard() {
  const savedDarkMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(savedDarkMode ? JSON.parse(savedDarkMode) : false);

  function toggleDarkMode() {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
  }
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);
  
  return (
    <div className={`${style.dashboardContainer} ${darkMode ? style.darkMode : ''} `}>
          <div id={style.header}>
            <div>
                <div id={style.logoSection}>
                  <Link to={"/home"}>
            <div>
              <img src={logotipo} alt="" width="370px" />
          </div>
            </Link>
                </div>
                <div id={style.containerButton}>
                  <button className={style.darkModeButton} onClick={toggleDarkMode} style={{color:"#fff"}}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>
                </div>
            </div>
          </div>
          <div id={style.body}>
            <div>
              <SideBar darkMode={darkMode} />
            </div>
            <div style={{width:"100%"}} id={style.contenedor}>
              <Route exact path="/dashboard/sales" component={Sales} />
              <Route exact path="/dashboard/clients" render={(props) => <Clients {...props} darkMode={darkMode} />} />
              <Route
              exact
              path="/dashboard/products"
              render={(props) => <Products {...props} darkMode={darkMode} />}
            />
              <Route exact path="/dashboard/products/create" component={CreateProduct} />
            </div>
          </div>
      </div>
  );
}

export default Dashboard;
