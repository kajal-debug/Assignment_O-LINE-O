import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import img from '../assests/Removebackground1.png';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './SpinWheel.css'; 

function SpinWheelGame() {
  const wheelRef = useRef(null);
  const spinBtnRef = useRef(null);
  const finalValueRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [values, SetValue] = useState();
  const [myChart, setMyChart] = useState(null);
  const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 20 },
    { minDegree: 31, maxDegree: 90, value: 100 },
    { minDegree: 91, maxDegree: 150, value: 60 },
    { minDegree: 151, maxDegree: 210, value: 50 },
    { minDegree: 211, maxDegree: 270, value: 40 },
    { minDegree: 271, maxDegree: 330, value: 30 },
    { minDegree: 331, maxDegree: 360, value: 10 }
  ];
  const data = [16, 16, 16, 16, 16, 16];
  const pieColors = ["#dc3545", "#198754", "#8b35bc", "#a7b2ad", "#e2cf75", "#b163da"];
  let count = 0;
  let resultValue = 101;
  const [canvasWidth, setCanvasWidth] = useState(0); // Adjust initial width as needed
  const [canvasHeight, setCanvasHeight] = useState(0); // Adjust initial height as needed

  useEffect(() => {
    let chartInstance = null;
    if (wheelRef.current && spinBtnRef.current && finalValueRef.current) {
      const ctx = wheelRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3, 4, 5, 6],
          datasets: [{
            backgroundColor: pieColors,
            data: data,
          }]
        },
        options: {
          responsive: true,
          animation: { duration: 0 },
          plugins: {
            tooltip: false,
            legend: { display: false },
            datalabels: {
              color: "#198754",
            //   formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            formatter: (value) => `Value: ${value}`,
              font: { size: 24 }
            }
          }
        }
      });
      setMyChart(chartInstance);
    }
    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
  

  function valueGenerator(angleValue) {
    // for (let i of rotationValues) {
    //   if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
    //     setShowModal(true);
    //     SetValue(i.value);
    //     setTimeout(() => {
    //       setShowModal(false)
          
    //     }, 5000)
    //     spinBtnRef.current.disabled = false;
    //     break;
    //   }
    // }
  }

  function handleSpinClick() {
    
    finalValueRef.current.innerHTML = `<p>Click On The Spin Button To Start!</p>`;
    if (!myChart) return;
   
    spinBtnRef.current.disabled = true;
    spinBtnRef.current.style.background = '#c3a3f1';
    finalValueRef.current.innerHTML = `<p>Good Luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
      myChart.options.rotation = myChart.options.rotation + resultValue;
      myChart.update();
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
        axios.get('http://127.0.0.1:3001/generate-cashback-offer').then((res)=>{
            console.log("resregister res",res.data.value)
           SetValue(res.data.value)
                setShowModal(true);
            setTimeout(() => {
              setShowModal(false)
              
            }, 50000)
            
            }).catch((err)=>{
              console.log(err,"err")
            });
      }
    }, 10);
  }

  return (
    <div className="wrapper">
         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        
        <Modal.Body closeButton> 
        <h2 style={{color: "#ee3636"}}>Congratulation!</h2>
          <p>You have got a cashback of {values}%</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container" >
        <canvas
          ref={wheelRef}
          id="wheel"
          width={canvasWidth} // Set canvas width dynamically
          height={canvasHeight} // Set canvas height dynamically
          style={{}} // Add border for visualization
        ></canvas>
        <img src={img} alt="spinner-arrow" />
      
   
        <button ref={spinBtnRef} id="spin-btn" onClick={handleSpinClick}>Spin</button>
      </div>
      <div ref={finalValueRef} id="final-value">
        <p>Click On The Spin Button To Start</p>
      </div>
    </div>
  );
}

export default SpinWheelGame;
