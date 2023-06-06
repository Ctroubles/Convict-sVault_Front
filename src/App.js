import { Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";



function App() {

  return (
    <div className="App">
      <Route exact path={"/"} render={()=> <Landing/>}/>
      <Route exact path={"/home"} render={()=> <Home/>}/>
    </div>
  );
}

export default App;
