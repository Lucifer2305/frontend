import React, { useState, useEffect } from "react";
import "../App.css";
import axios, { Axios } from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Protected from "../Protected";
import auth from "../auth";
//fancy way of writting BaseURL
const backendAPI = axios.create({
  baseURL:
    "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/testing",
});
const TOKEN = "";

function LoginForm() {
  
  const isAuthorised = {};

  const loggedIn = Protected
  const navigate = useNavigate();
  const [testingPost, testingsetPost] = useState(null);
  const [post, setPost] = useState(null);
  //set the useState as 0 to store Number
  const [post2, setPost2] = useState(0);
  //set error useState
  const [error, setError] = useState(null);
  //for login form
  const [login_form, setLoginForm] = useState(null);

  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  //submission form

  function submitPost() {
    axios
      .post(
        "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/login",
        {
          email: "test9@gmail.com",
          lastName: "123456",
        }
      )
      .then(function (response) {
        console.log(response);
      });
  }

  
   
  
  

  const handleSubmit = async () => {
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("email", "test9@gmail.com");
    loginFormData.append("password", "123456");

    try {
      //make axios post request
      console.log("wwww");
      const response = await axios({
        method: "post",
        url: "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/login",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 201) {
        //isLoggedIn.isLoggedIn(true)
        //isAuthorised = {value : true}
        auth.setlogin();
        alert(auth.isLoggedIn)
        navigate("/contact");
        console.log(isAuthorised)
      } else {
        console.log(error);
      }
      console.log([response]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit} class="login">
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
          <button type="submit" class="buttonFade" onClick={submitPost}>
            Login
          </button>
        </form>
        <div>
          <button onClick={handleSubmit} class="buttonFade">
            Tap Me!
          </button>
        </div>
      </header>
    </div>
  );
}

export default LoginForm;
