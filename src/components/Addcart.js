import axios from 'axios';
import React, { useState } from 'react'
import { Form, ToastContainer } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
export default function Addcart() {

  function getHeader() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    return headers;
  }

  function getBaseUrl() {
    return "http://localhost:8081/";
  }

  const navigate = useNavigate();

  const [shipp, setShip] = useState({
    name: "",
    email: "",
    mobileno: "",
    address: "",
    pincode: "",
    city: "",
  });

  const [userValidation, setUserValidation] = useState({
    nameMessage: "",
    emailMessage: "",
    pincodeMessage: "",
    mobilenoMessage: "",
    addressMessage: "",
    cityMessage: "",
  });

  function setUserData(e) {
    e.preventDefault();
    setShip({ ...shipp, [e.target.id]: e.target.value });
  }


  function save(e) {
    e.preventDefault();

    let validated = true;
    let nameMessage = "";
    let emailMessage = "";
    let mobilenoMessage = "";
    let pincodeMessage = "";
    let addressMessage = "";
    let cityMessage = "";

    if (shipp.name === "") {
      nameMessage = "Please EnterFirst  Name";
      validated = false;
    }

    if (shipp.email.trim() === "") {
      emailMessage = "Please Enter Email";
      validated = false;
    }
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(shipp.email)) {
      emailMessage = "Please Enter Valid Email";
      validated = false;
    }

    if (shipp.mobileno === "") {
      mobilenoMessage = "Please Enter mobile number";
      validated = false;
    }
    else if (!/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/.test(shipp.mobileno)) {
      mobilenoMessage = "Please Enter valid Mobileno";
      validated = false;
    }


    if (shipp.address === "") {
      addressMessage = "Please Enter Address";
      validated = false;
    }

    if (shipp.city === "") {
      cityMessage = "Please Enter Password";
      validated = false;
    }

    if (shipp.pincode === "") {
      pincodeMessage = "Please Enter mobile number";
      validated = false;
    }

    setUserValidation({
      nameMessage: nameMessage,
      emailMessage: emailMessage,
      mobilenoMessage: mobilenoMessage,
      pincodeMessage: pincodeMessage,
      addressMessage: addressMessage,
      cityMessage: cityMessage
    })
    try {

      if (validated) {

        if (shipp) {
          axios.post(getBaseUrl() + 'orderplaced/', {
            name: shipp.name,
            email: shipp.email,
            mobileno: shipp.mobileno,
            address: shipp.address,
            pincode: shipp.pincode,
            city: shipp.city
          }, { headers: getHeader() },).then((response) => {



            if (response) {

              navigate('/orderplaced');

            }
          });
        }


      }

    }
    catch (err) {
      toast.error('error...!', { autoClose: 3000 },
        { position: toast.POSITION.TOP_RIGHT })
    }
  }


  return (
    <div className=''>
      <div className="row">
        <div className="col-lg-2">
        </div>
        <div className="col-lg-8">
          <div className="border m-2 p-2 ">
            <div>
              <div className="container text-dark mt-0 ">
                <h1 className="text-center text-primary">Shipping Address</h1>

                <div className="row">
                  <div className="col-lg-3 ml-5">
                    <ToastContainer />

                  </div>
                  <div className="col-lg-6">
                    <Form className="">
                      <div className="form-group">
                        <label> Enter Name </label>
                        <input
                          type="text" value={shipp.name}
                          className="form-control"
                          id="name"
                          placeholder="Enter Name" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.nameMessage}</span>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Enter your email</label>
                        <input
                          type="email" value={shipp.email}
                          className="form-control"
                          id="email" name='email'
                          placeholder="Enter email" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.emailMessage}</span>
                      </div>
                      <br />

                      <div className="form-group">
                        <label>Enter Mobile Number</label>
                        <input
                          type="number"
                          className="form-control" value={shipp.mobileno}
                          id="mobileno" name='mobileno'
                          placeholder="Enter Your Number" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.mobilenoMessage}</span>
                      </div>
                      <br />

                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="textarea"
                          className="form-control"
                          id="address" name='address' value={shipp.address}
                          placeholder="Enter Your Address" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.addressMessage}</span>
                      </div>
                      <br />

                      <div className="form-group">
                        <label> Pincode</label>
                        <input
                          type="number"
                          className="form-control"
                          id="pincode" name='pincode' value={shipp.pincode}
                          placeholder="Enter Pincode" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.pincodeMessage}</span>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>Enter City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city" name='city' value={shipp.city}
                          placeholder="Enter City" onChange={(e) => { setUserData(e) }}

                        />
                        <span className='text-danger'>{userValidation.cityMessage}</span>
                      </div>
                      <br />

                      <Link to="/orderplaced">
                        <button
                          className="btn btn-primary mb-3 text-left text-white border "
                          value="Place Order" onClick={(e) => { save(e) }}
                        >
                          Place Order
                        </button>
                      </Link>
                    </Form>
                  </div>
                  <div className="col-lg-3 ml-5">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2"></div>
      </div>
      <div className="row  m-1">
        <div className="col-lg-12 bg-primary border">
          <h4 className='text-center text-white'>footer</h4>
        </div>
      </div>
    </div>
  )
}
