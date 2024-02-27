import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import external CSS file

function Register() {
  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log('e',e)
 
  axios.post('http://127.0.0.1:3001/register',{
    email,
    fullName
  }).then((res)=>{
    console.log("resregister res",res.data)
    if(res.data==="Verification email sent successfully"){
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false)
        navigation('/OTPVerification')
      }, 3000)
    }
   
    else {setShowModal(false)}
  }).catch((err)=>{
    console.log(err)
  })
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Email Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email registered successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="cardreg">
      {/* {showNotification && (
          <div className="email-notification">
           <h2>Email Notification</h2>
      <p>An email with OTP has been sent to your email address. Please check your inbox.</p>
          </div>
        )} */}
        <div className="card-body cardfrombody">
          <h2 className="card-title text-center mb-4">Registration</h2>
          <form onSubmit={handleSubmit} className='mt-lg-5'>
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-4 col-lg-2  col-form-label 
              ">Email:</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="fullName" className="col-sm-4 col-lg-2 col-form-label ">FullName:</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
            </div>
           
            <div className='row mt-lg-3'>
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary position-absolute bottom-0 mb-lg-3 mb-md-3 start-50 translate-middle-x">Register</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
