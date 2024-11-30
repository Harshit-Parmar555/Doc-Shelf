import LandingPage from "./Landing-Page/LandingPage";
import RegisterPage from "./Register-Page/RegisterPage";
import LoginPage from "./Login-Page/LoginPage";
import Dashboard from "./DashBoard-Page/Dashboard";
import Profile from "./Profile-Page/Profile";
import Upload from "./Upload-Page/Upload";
import Protected from "./Protected Route/Protected";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Protected/>}>
        <Route path="/dashboard" element={<><Dashboard/><ToastContainer/></>}/>
        <Route path="/profile" element={<><Profile/><ToastContainer/></>}/>
        <Route path="/upload" element={<><Upload/><ToastContainer/></>}/>
        </Route>
        <Route path="/" element={<><LandingPage/></>}/>
        <Route path="/register" element={<><RegisterPage/><ToastContainer/></>}/>
        <Route path="/login" element={<><LoginPage/><ToastContainer/></>}/>
       
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
