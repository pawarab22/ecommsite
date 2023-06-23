import Home from "./components/Home";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Products from "./components/Product";
import Checkout from "./components/Checkout";
import Placeorder from "./components/Placeorder";
import Addcart from "./components/Addcart";
import Addproduct from "./components/Addproduct";
import axios from "axios";
import Protect from './components/Protect';
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function App() {

  // For POST requests
  axios.interceptors.response.use(
    (res) => {

      console.log(res);

      if (res.data.statusCode === 408) {
        window.location.href = "/";
        toast.error('error...!', { autoClose: 3000 },
          { position: toast.POSITION.TOP_RIGHT })
        return

      }
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (

    <div className="m-3">
      <h1 className='text-light text-center bg-warning border border-2 p-2 '> E-Commerce Site </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/buynow" element={<Addcart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/orderplaced" element={<Placeorder />} />
          <Route path="/addproduct" element={<Addproduct />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}
