import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useAxios } from "use-axios-client";
import axios, { Axios } from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Contact from "./pages/Contact";
import LoginForm from "./pages/loginForm";
import Protected from "./Protected";
import auth from "./auth";

//aws laravel backend endpoint
const BASE_URL =
  "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/testing";
//dummy endpoint
const baseURL = "https://jsonplaceholder.typicode.com/posts";

//fancy way of writting BaseURL
const backendAPI = axios.create({
  baseURL:
    "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/testing",
});
const TOKEN = "";

function App() {
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
        navigate("/contact");
      } else {
        console.log(error);
      }
      console.log([response]);
    } catch (error) {
      console.log(error);
    }
  };

  const login = () => {
    navigate("/login");
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });


  };

  //error handling meesage
  //you can add on redirect route to 400 route
  // if (error) return `Error: ${error.message}`;
  // if (!post) return "no post!";

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={auth.revoke} class="buttonFade">
            Back
          </button>
          <button onClick={login} class="buttonFade">
            Login!
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
