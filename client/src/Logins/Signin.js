import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useAuth } from '../Auth/Auth';
import { Form, Button, Alert } from "react-bootstrap";
import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";

const Signin = () => {
  const history = useNavigate("");

  const [inpval, setINP] = useState({
    email: "",
    password: "",
    type:"student"
  });

  const storeTokenInLS = useAuth();

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    });
  }
  const handleUserTypeChange = (event) => {
    setINP((prevData) => ({ ...prevData, type: event.target.value }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();
    console.log(inpval)
    const { email, password,type } = inpval;
    console.log(type)
    try {


      if(type==="student")
      {
        console.log("asdakjsndkjas")
        const response = await axios.post('/api/v1/usignin', {
          email,
          password,
        })
        if (response.status === 200) {
          storeTokenInLS(response.data.token);
          alert("Signin successful!");
          console.log("data added");
          history(`/uhomepage`);
        } else {
          console.error("-Error:", response.statusText);
          alert("Signin failed. Please check your credentials.");
        }
      }
      else
      {
        const response = await axios.post('/api/v1/asignin', {
          email,
          password,
        })
        if (response.status === 200) {
          storeTokenInLS(response.data.token);
          alert("Signin successful!");
          console.log("data added");
          history(`/ahomepage`);
        } else {
          console.error("-Error:", response.statusText);
          alert("Signin failed. Please check your credentials.");
        }
      }
    } catch (error) {
      console.error("---Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sign-in__wrapper"
    style={{ backgroundImage: `url(${BackgroundImage})` }}>
      {/* <Helmet>
        <style>{'body { background: linear-gradient(#141e30, #243b55); }'}</style>
      </Helmet> */}
      <div class="login-box">
        <form className="shadow p-4 bg-white rounded">
        <div className="h4 mb-2 text-center">Sign In</div>
          <div className="mb-1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={inpval.email} onChange={setdata} name="email" required="" />
          </div>
          <div className="mb-1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={inpval.password} onChange={setdata} name="password" required="" />
          </div>
          <br />
           <div className="mb-1">
            <label htmlFor="type">User Type</label>
            <br></br>
            <select id="type" name="type" value={inpval.type} onChange={handleUserTypeChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              
            </select>
          </div>
          <button type="submit" onClick={addinpdata} class="w-100 btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
