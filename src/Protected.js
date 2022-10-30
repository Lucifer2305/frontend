import { extend } from "@vue/shared";
import { Navigate, Outlet } from "react-router-dom";
import LoginForm from "./pages/loginForm";
import contact from "./pages/Contact";

import React from "react";
import auth from "./auth";
import { Component } from "react";

const useAuth = () => {
  const user = { loggedIn: auth.isLoggedIn };
  return user && user.loggedIn;
};

const Protected = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
