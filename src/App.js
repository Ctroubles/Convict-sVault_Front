import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";

function App() {

  return (
    <div className="App">
      <Route exact path={"/"} render={()=> <Landing/>}/>
      <Route exact path={"/home"} render={()=> <Home/>}/>
      <Route exact path={"/dashboard"} render={()=> <Dashboard/>}/>
    </div>
  );
}

export default App;
