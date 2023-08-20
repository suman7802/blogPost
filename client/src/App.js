import "./index.css";
import React from "react";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/Login.js";
import Footer from "./components/Footer.js";
import CheckCookie from "./components/CheckCookie";
import Registration from "./components/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CheckCookie requiredCookieName="access-token-01" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
