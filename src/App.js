import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Landing from "./views/Landing/Landing";
import Home from "./views/home/Home";
import Dashboard from "./admin/Dashboard";
import Header from "./components/Header/header";
import ByCategory from "./views/ByCategory/ByCategory";
import Footer from "./components/Footer/Footer.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./views/Profile/Profile";
import { setId, setUserCart } from "./Redux/store/actions/actions";
import { useDispatch } from "react-redux";
import FormPayment from "./views/Payment/Payment.jsx";
import { Redirect } from 'react-router-dom';
import PaymentCheckout from "./views/Payment/components/pasarela/Pasarela";


////////////
import PayUResponseSummary from "./views/Payment/components/paymentButton/PayuResponse/PayuResponsePage";
import PayUConfirmationPage from "./views/Payment/components/paymentButton/PayuConfirmationPage";
import ErrorPage from "./views/Payment/components/paymentButton/ErrorPage";
import TransactionHistory from "./admin/transactionsHistory/transactionHistory";
import Url_deploy_back from "./util/deploy_back";
import PayUCheckout from "./views/Payment/components/paymentButton/PayuResponse/newPayu";
import Epayco from "./views/Payment/EpaycoImp/epayco";
import AboutUs from "./views/home/components/aboutUs/aboutUs";




function App() {


  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout } =
    useAuth0();

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);


  useEffect(() => {
    const postUser = async () => {
      const response = await axios.post(
        `${Url_deploy_back}/users/createuser`,
        { ...user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        ).catch((err) => {alert("error al crear el usuario");console.log(err)});
        
        const data = response?.data;
        if (data) {
        console.log("segundo")
        setCurrentUser(data);
        dispatch(setId(data._id));
        dispatch(setUserCart(data.cart));
        const emailSent = localStorage.getItem("emailSent");
        if (!emailSent) {
          console.log("tercero")
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
      console.log("cuarto")
      await axios.post(
        `${Url_deploy_back}/users/send-email`,
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
      const userr = await axios.get(`${Url_deploy_back}/users/db/${user.email}`);
      if (userr.data.isActive === false) {
        alert("User is banned. Please contact us for more information");
        logout({ returnTo: window.location.origin });
      }
    };

    if (user) {
      userBanned();
    }
  }, []);



  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  useEffect(() => {

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className={`App`}>
      {loadingStatus ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <div id="spinner"></div>
        </div>
      ) : (
        <Router>

          <Route path={"/testPayment"} render={()=> <Epayco/>} />
          <Route path="/aboutUs" render={() =>
          <>
            <div className='headerContainer'>
              <Header user={currentUser} viewportWidth={viewportWidth} />
            </div>
            <div className='bodyContainer'>
              <AboutUs />
              <Footer />
            </div>
          </>
        } />
          <Route path={"/epayco"} render={()=> <Epayco/>} />
          <Route path={"/queris"} render={()=> <PayUCheckout user={currentUser}/>} />
          <Route exact path={"/checkout"} render={()=> <FormPayment user={currentUser}/>} />
          <Route exact path={"/checkout/payment"} render={()=> <PaymentCheckout user={currentUser}/>} />


          <Route path={"/response"} render={()=> <PayUResponseSummary user={currentUser}/>}/>
          <Route path={"/confirmation"} render={()=> <PayUConfirmationPage/>}/>
          {/* <Route path={"/success"} render={() =><SuccesPage />}/> */}
          <Route path={"/error"} render={()=> <ErrorPage/>} />
          <Route exact path={"/"} render={() => <Landing />} />
          <Route path={"/history"} render={() => <TransactionHistory />} />


          <Route path="/home" render={() =>
            <>
              <div className={'headerContainer'}>
                <Header user={currentUser} viewportWidth={viewportWidth} />
              </div>
              <div  className={'bodyContainer'}>
                <Home viewportWidth={viewportWidth}/>
                <Footer />
              </div>             
            </>
          } />
          <Route path="/category/:cat" render={() =>
            <>
              <div className={'headerContainer'}>
                <Header user={currentUser} viewportWidth={viewportWidth} />
              </div>
              <div className={'bodyContainer'}>
                <ByCategory />
                <Footer />
              </div>              
            </>
          } />
          <Route path="/account/:sec?" render={() =>
            !isAuthenticated ? loginWithRedirect() :
            (
              <>
                <div className={'headerContainer'}>
                  <Header user={currentUser} viewportWidth={viewportWidth}/>
                </div>
                <div className={'bodyContainer'}>
                  <Profile user={currentUser} viewportWidth={viewportWidth}/>
                  <Footer />
                </div>
              </>
            )
          } />
            <Route
              path="/dashboard"
              render={() =>
                !isAuthenticated ? (
                  loginWithRedirect()
                ) : currentUser?.isAdmin ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/home" />
                )
              }
            />
        </Router>
      )}
    </div>
  );
}

export default App;