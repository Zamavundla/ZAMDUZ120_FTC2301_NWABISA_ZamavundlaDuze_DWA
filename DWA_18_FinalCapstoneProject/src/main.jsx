/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Components/Login/AuthProvider'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css';



// Replace ReactDOM.render with ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
