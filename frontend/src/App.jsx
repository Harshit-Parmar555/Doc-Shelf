import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestrictedRoute from "./CustomeComponent/RestrictedRoute";
import ProtectedRoute from "./CustomeComponent/ProtectedRoute";

// Pages Import
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import UploadPage from "./Pages/UploadPage";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import FilesharePage from "./Pages/FilesharePage";
import ReceivedFilePage from "./Pages/ReceivedFilePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route
            path="/"
            element={
              <>
           
                <LandingPage />
              
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
             
                <RegisterPage />
                <Toaster />
              
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
          
                <LoginPage />
                <Toaster />
         
              </>
            }
          />
          </Route>
         <Route element={<RestrictedRoute/>}>
          <Route
            path="/home"
            element={
              <>
             
                <HomePage />
                <Toaster />
          
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
               
                <ProfilePage />
                <Toaster />
               
              </>
            }
          />
          <Route
            path="/upload"
            element={
              <>
     
                <UploadPage />
                <Toaster />
          
              </>
            }
          />
          <Route
            path="/sharefile/:id"
            element={
              <>
       
                <FilesharePage />
                <Toaster />
  
              </>
            }
          />
          <Route
            path="/receivedfile"
            element={
              <>
            
                <ReceivedFilePage />
                <Toaster />
               
              </>
            }
          />
        </Route>
          <Route
            path="/contactus"
            element={
              <>
                <ContactUs />
              </>
            }
          />
          <Route
            path="/aboutus"
            element={
              <>
                <AboutUs />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
