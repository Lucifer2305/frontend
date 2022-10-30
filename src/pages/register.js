import React, { useState, useEffect } from "react";
import "../App.css";
import axios, { Axios } from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  //store credentials
  const [formValue, setformValue] = useState({
    name: "lancer",
    email: "lancer@gmail.com",
    password: "123456",
    password_confirmation: "123456",
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
    loginFormData.append("name", formValue.name);
    loginFormData.append("email", formValue.email);
    loginFormData.append("password", formValue.password);
    loginFormData.append(
      "password_confirmation",
      formValue.password_confirmation
    );
    try {
      //make axios post request
      const response = await axios({
        method: "post",
        url: "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/register",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      let responses = [response.data];
      let TOKEN = responses[0];
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
      <form onSubmit={handleSubmit}>
        <p>Register</p>
        <input
          type="name"
          name="name"
          placeholder="enter an name"
          value={formValue.name}
          onChange={handleChange}
        />
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
        <input
          type="password"
          name="password"
          placeholder="enter a password confirmation"
          value={formValue.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit" className="buttonFade" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
