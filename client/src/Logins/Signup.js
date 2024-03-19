import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from "react-bootstrap";
import BackgroundImage from '../assets/img/signin.png'
import "../css/login.css";
import axios from 'axios';
import { useAuth } from '../Auth/Auth';


const Signup = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegeid: '',
    phone: '',
    semester: '',
    type: "student"
  });
  const handleUserTypeChange = (event) => {
    setFormData((prevData) => ({ ...prevData, type: event.target.value }));
  };

  const storeTokenInLS = useAuth();

  const handleFormChange = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleUserTypeChange = (event) => {
  //   setFormData((prevData) => ({ ...prevData, type: event.target.value }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData()
    formdata.append("file", image)
    formdata.append("upload_preset", "testing")
    formdata.append("cloud_name", "dpywvy2za")
    const res1 = await fetch('https://api.cloudinary.com/v1_1/dpywvy2za/image/upload', {
      method: "post",
      body: formdata
    })
    const ImgData = await res1.json()
    const url1 = ImgData.url
    setUrl(url1);
    console.log(url1)

    try {
      console.log(formData)
      const { name, email, password, collegeid, phone, semester, type } = formData;
      console.log(type)





      if (type === "student") {
        const response = await axios.post('/api/v1/usignup', {
          name, email, password, url1, collegeid, phone, semester
        });
        console.log(response);
        if (response.status === 200) { // Assuming 201 (Created) for successful signup
          alert(`Registered successfully as ${formData.type}!`);
          storeTokenInLS(response.data.token);
          navigate('/uhomepage'); // Use appropriate redirect logic
        } else {
          // Handle other status codes appropriately
          // Consider using more granular error handling
          console.error('Error:', response.status, response.data);
          alert('Error registering. Please try again.');
        }
      }
      else {
        const response = await axios.post('/api/v1/asignup', {
          name, email, password, url1, collegeid, phone
        });
        console.log(response);
        if (response.status === 200) { // Assuming 201 (Created) for successful signup
          alert(`Registered successfully as ${formData.type}!`);
          storeTokenInLS(response.data.token);
          navigate('/ahomepage'); // Use appropriate redirect logic
        } else {
          // Handle other status codes appropriately
          // Consider using more granular error handling
          console.error('Error:', response.status, response.data);
          alert('Error registering. Please try again.');
        }
      }


    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* <Helmet>
        <style>{`
          body { background: linear-gradient(#141e30, #243b55); }
        `}</style>
      </Helmet> */}
      <form className="shadow p-4 bg-white rounded">
        <div className="h4 mb-2 text-center">Sign Up</div>
        <div className="mb-1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="email">Email      </label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password">Password</label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="collegeid">collegeid</label>
          <Form.Control
            type="text"
            id="collegeid"
            name="collegeid"
            value={formData.collegeid}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="phone">Phone</label>
          <Form.Control
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            required
          />
        </div>
        <br />
        <div className="mb-1">
          <label htmlFor="type">User Type</label>
          <br></br>
          <select id="type" name="type" value={formData.type} onChange={handleUserTypeChange} required>
            <option value="student">Student</option>
            <option value="admin">Admin</option>

          </select>
        </div>
        {formData.type === "student" ? (
          <>
            <div className="mb-1">
              <label htmlFor="semester">semester</label>
              <Form.Control
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleFormChange}
                required
              />
            </div>
          </>
        ) : (
          <>
          </>
        )}
      <br></br>
        <div className="mb-1">
          <label htmlFor="url" >pic</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        </div>
        <button type="submit" onClick={handleSubmit} class="w-100 btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
