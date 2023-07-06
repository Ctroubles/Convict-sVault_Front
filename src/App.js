import { BrowserRouter as Router, Route } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";
import Header from "./components/Header/header";
import ByCategory from "./views/ByCategory/ByCategory";
import Footer from "./components/Footer/Footer.jsx";
import "./app.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./views/Profile/Profile";
import { setId, setUserCart } from "./Redux/store/actions/actions";
import { useDispatch } from "react-redux";
import PasarelaDePagos from "./components/pasarelaDePagos/pasarelaDePagos";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom";

function App() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout } =
    useAuth0();

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const postUser = async () => {
      const response = await axios.post(
        "http://localhost:3001/users/createuser",
        { ...user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => {alert("error log");console.log(err)});

      const data = response?.data;
      if (data) {
        setCurrentUser(data);
        dispatch(setId(data._id));
        dispatch(setUserCart(data.cart));
        const emailSent = localStorage.getItem("emailSent");
        if (!emailSent) {
          try {
            await sendEmail(data);
            localStorage.setItem("emailSent", "true");
          } catch (error) {
            console.log("Error al enviar el correo electrónico:", error.message);
          }
        }
      }
    };

    const sendEmail = async (data) => {
      await axios.post(
        "http://localhost:3001/users/send-email",
        { userId: data.id, email: data.email, name: data.name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => console.log(err.message));
    };

    const setting = async () => {
      if (isAuthenticated) await postUser();
      if (!isLoading) setLoadingStatus(false);
    };

    setting();
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    const userBanned = async () => {
      const userr = await axios.get(`http://localhost:3001/users/db/${user.email}`);
      if (userr.data.isActive === false) {
        alert("User is banned. Please contact us for more information");
        logout({ returnTo: window.location.origin });
      }
    };

    if (user) {
      userBanned();
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {loadingStatus ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <div id="spinner"></div>
        </div>
      ) : (
        <Router>
          <Route path={"/pagos"} render={()=> <PasarelaDePagos/>} />
          <Route exact path={"/"} render={() => <Landing />} />
          <Route path="/home" render={() =>
            <>
              <Header user={currentUser} />
          <div className="mode-toggle">
            <button className="darkModeButton" onClick={toggleDarkMode}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
              <Home />
              <Footer />
            </>
          } />
          <Route path="/category/:cat" render={() =>
            <>
              <Header user={currentUser} />
              <ByCategory />
              <Footer />
            </>
          } />
          <Route path="/account/:sec?" render={() =>
            !isAuthenticated ? loginWithRedirect() :
            (
              <>
                <Header user={currentUser} />
                <Profile user={currentUser} />
                <Footer />
              </>
            )
          } />
          <Route path={"/dashboard"} render={() => <Dashboard />} />
          {/* <Route path={"/dashboard"} render={() => !isAuthenticated ? loginWithRedirect() : currentUser?.isAdmin ? <Dashboard /> : <Redirect to="/home" />} /> */}
        </Router>
      )}
    </div>
  );
}

export default App;