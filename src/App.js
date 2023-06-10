import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";
import Header from "./components/Header/header";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import ByCategory from "./views/ByCategory/ByCategory";
import Footer from "./components/Footer/Footer.jsx"


function App() {
  const location = useLocation()

  return (
    <div className="App">
      <Router>
      <Route exact path={"/"} render={()=> <Landing/>}/>
      { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin')  && <Header />}
      <Route exact path={"/home"} render={()=> <Home/>}/>
      <Route exact path={"/category/:cat"} render={()=> <ByCategory/>}/>
      <Route exact path={"/dashboard"} render={()=> <Dashboard/>}/>
      { location.pathname!=='/' && !location.pathname.toLowerCase().includes('/admin')  && <Footer/>}
      </Router>
    </div>
  );
}

export default App;


{/* <Route exact path={"/"} render={()=> <Landing/>}/>
<Route exact path={"/home"} render={()=> <Home/>}/>
<Route exact path={"/dashboard"} render={()=> <Dashboard/>}/> */}