import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './otp.css';

function OTPVerification() {
  const navigation = useNavigate();
  const [otp, setOTP] = useState('');

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:3001/verify-otp',{
      otp
    }).then((res)=>{
      console.log("resregister res",res.data)
      if(res.data==="OTP verified successfully. Redirect to spin wheel game."){
        navigation('/spinWheel')
      }
      
      }).catch((err)=>{
        console.log(err,"err")
      })}; 

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="cardotp">
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOTPChange}
        />
        <button className='bttonotp btn btn-primary' type="submit">Verify OTP</button>
      </form>
    </div>
    </div>
  );
}

export default OTPVerification;
