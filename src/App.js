import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";
import Header from "./components/Header/header";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import ByCategory from "./views/ByCategory/ByCategory";
import Footer from "./components/Footer/Footer.jsx"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function App() {

  const { user,isAuthenticated,loginWithRedirect,isLoading} = useAuth0()

  const [currentUser, setCurrentUser]=useState({})
  const [loadinStatus, setLoadingStatus]=useState(true)
  const location = useLocation()

  const {logout} = useAuth0();
  useEffect(()=>{
    const setting = async()=>{
      const postUser=async()=>{
        const response = await axios.post(`http://localhost:3001/users/createuser`,{email:user.email }).catch(err=>console.log(err))
        const data= response?.data;
        if(data){
          setCurrentUser(data)
        }
      }
      if(isAuthenticated) await postUser()
      if(!isLoading)setLoadingStatus(false)
    }
    setting()
   
  },[user, isLoading])

  useEffect(()=>{
    const userBanned = async()=>{
    const userr = await axios.get(`http://localhost:3001/users/db/${user.email}`)
    if(userr.data.isActive===false){
      alert("User is banned. Please contact us for more information")
      logout({ returnTo: window.location.origin })
    }
  }
  if(user){
    userBanned()
  }
})

  return (
    <div className="App">
      <Router>
      <Route exact path={"/"} render={()=><Landing/>}/>
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