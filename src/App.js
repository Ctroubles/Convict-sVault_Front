import { BrowserRouter as Router, Route } from "react-router-dom";
import { RiLoader4Line } from "react-icons/ri";
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";
import Header from "./components/Header/header";
import ByCategory from "./views/ByCategory/ByCategory";
import Footer from "./components/Footer/Footer.jsx"
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./views/Profile/Profile";

function App() {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const { logout } = useAuth0();

  useEffect(() => {
    const postUser = async () => {
      const response = await axios.post(
        "http://localhost:3001/users/createuser",
        { email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => console.log(err.message));

      const data = response?.data;
      if (data) {
        setCurrentUser(data);
        const emailSent = localStorage.getItem("emailSent");
        if (!emailSent) {
          await sendEmail(data);
          localStorage.setItem("emailSent", "true");
        }
      }
    };

    const sendEmail = async (data) => {
      await axios.post(
        "http://localhost:3001/users/send-email",
        { userId: data.id, email: data.email },
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

  return (
    <div className="App">
      {loadingStatus ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <RiLoader4Line size={82} color="#999" />
        </div>
      ) : (
        <Router>
          <Route exact path={"/"} render={() => <Landing />} />
          <Route path="/home" render={() =>
            <>
              <Header user={currentUser} />
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
          <Route path="/account/:sec" render={() =>
          !isAuthenticated?loginWithRedirect():
          (  <>
              <Header user={currentUser} />
                  <Profile user={currentUser}/>
              <Footer />
            </>)
          } />
          <Route path={"/dashboard"} render={() => <Dashboard />} />
        </Router>
      )}
    </div>
  );
}

export default App;
