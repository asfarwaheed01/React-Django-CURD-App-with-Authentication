import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { NavigationRoutes } from "../utils/routes";
import "../styles/Form.css"
import api from "../utils/api"

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const handleSubmit = async (event) => {
    setIsloading(true);
    event.preventDefault();
    try {
        const response = await api.post(route, {username,password})
        if(method === "login"){
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            navigate(NavigationRoutes.Home);
        }else{
            navigate(NavigationRoutes.Login)
        }
    } catch (error) {
        alert(error);
    }finally{
        setIsloading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" className="form-button" disabled={isLoading}>
        {isLoading ? "Loading..." : name}
      </button>
      <p className="form-footer">
        {method === "login" ? (
          <>
            Don't have an account? <Link to={"/register"}>Register here</Link>.
          </>
        ) : (
          <>
            Already have an account? <Link to={"/login"}>Login here</Link>.
          </>
        )}
      </p>
    </form>
  );
};

export default Form;
