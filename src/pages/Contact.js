import React from "react";
import { useState } from "react";
import "../App.css";
import axios, { Axios } from "axios";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const baseURL =
    "http://lionbackend-env.eba-jyvydwg3.ap-southeast-1.elasticbeanstalk.com/api/cForm";
  const [formValue, setformValue] = useState({
    name: "",
    email: "",
    dateofbirth: "",
    SSN: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    // store the states in the form data
    var token = localStorage.getItem("token");

    const CFormData = new FormData();
    CFormData.append("name", formValue.email);
    CFormData.append("email", formValue.password);
    CFormData.append("dateofbirth", formValue.dateofbirth);
    CFormData.append("SSN", formValue.SSN);
    try {
      //make axios post request
      const response = await axios({
        method: "post",
        url: baseURL,
        data: CFormData,
        headers: { Authorization: `Bearer ${token}` },
      });
      setformValue({
        ...formValue,
        name: "",
        email: "",
        dateofbirth: "",
        SSN: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App login">
      <form onSubmit={handleSubmit}>
        <p>Contact Form</p>
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
          type="dateofbirth"
          name="dateofbirth"
          placeholder="enter an dateofbirth"
          value={formValue.dateofbirth}
          onChange={handleChange}
        />
        <input
          type="SSN"
          name="SSN"
          placeholder="enter an SSN"
          value={formValue.SSN}
          onChange={handleChange}
        />
      </form>
      <button type="submit" className="buttonFade" onClick={handleSubmit}>
        Login2
      </button>
    </div>
  );
}

export default ContactForm;
