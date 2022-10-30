import React, { useState, useEffect } from "react";
import "../App.css";
import axios, { Axios } from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import auth from "../auth";

//fancy way of writting BaseURL

function LoginForm() {
  const navigate = useNavigate();
  //store credentials
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });

  //submission form
  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("email", formValue.email);
    loginFormData.append("password", formValue.password);
    try {
      //make axios post request
      const response = await axios({
        method: "post",
        url: "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      let responses = [response.data];
      let TOKEN = responses[0];
      auth.setlogin();
      localStorage.setItem("token", TOKEN["token"]);
      navigate("/contact");
      console.log(response.status);

      //navigate("/contact");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App login">
      <form>
        <p>Login Form</p>
        <input
          type="email"
          name="email"
          placeholder="enter an email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="enter a password"
          value={formValue.password}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit} className="buttonFade">
        submit
      </button>
    </div>
  );
}

export default LoginForm;
