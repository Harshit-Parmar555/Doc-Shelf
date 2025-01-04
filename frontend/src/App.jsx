import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Pages Import
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { useAuthStore } from "./store/useAuthStore";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { checkAuth, checkingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/landing"
          element={<>{!authUser ? <Landing /> : <Navigate to="/" />}</>}
        />
        <Route
          path="register"
          element={<>{!authUser ? <Register /> : <Navigate to="/" />}</>}
        />
        <Route
          path="login"
          element={<>{!authUser ? <Login /> : <Navigate to="/" />}</>}
        />

        {/* App Routes */}
        <Route
          path="/"
          element={<>{authUser ? <Home /> : <Navigate to="/landing" />}</>}
        />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
};

export default App;
