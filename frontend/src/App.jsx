import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { NavigationRoutes } from "./utils/routes";

function Logout() {
  localStorage.clear();
  return <Navigate to={NavigationRoutes.Login} />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <Routes>
      <Route
        path={NavigationRoutes.Home}
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path={NavigationRoutes.Login}
        element={
          <Login/>
        }
      />
      <Route
        path={NavigationRoutes.Register}
        element={
          <RegisterAndLogout/>
        }
      />
      <Route
        path={NavigationRoutes.Logout}
        element={
          <Logout/>
        }
      />
      <Route
        path={NavigationRoutes.NotFound}
        element={
          <NotFound/>
        }
      />
    </Routes>
  );
}

export default App;
