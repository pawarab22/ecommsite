import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

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


  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [passwordError, setpasswordError] = useState("");

  const [usernameError, setusernameError] = useState("");

  const navigate = useNavigate();

  const handleValidation = (event) => {

    let formIsValid = true;

    if (!username.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setusernameError("Username Not Valid");
      return false;
    } else {
      setusernameError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {

    e.preventDefault();
    handleValidation();

    if (username && password) {
      axios.post(getBaseUrl() + 'authentication/login', {
        username: username,
        password: password
      }, { headers: getHeader() },).then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          navigate("/products");
        }
        else {
          toast.error('Invlid credentials...!', { autoClose: 3000 },
            { position: toast.POSITION.TOP_RIGHT })
        }
      })

    }
  }

  useEffect(() => {
    document.title = 'Log In';

    if (localStorage.getItem("token") == null)
      localStorage.setItem("token", "abhishek");


    axios.post(getBaseUrl() + "gettoken", { token: "abhishek" }, { headers: getHeader() }).then((result) => {
      if (result.data.status === "success") {
        localStorage.setItem("token", result.data.token);
      }
    }, (err) => {
      console.log(err);
    });

  }, []);

  return (
    <>
      <div className="container mt-3 border ">
        <h2 className='text-center mt-4 text-primary'><u> User Credentials </u> </h2>
        <div className="">
          <div className="">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <form id="loginform" className='m-4' >
                  <div className="form-group">
                    <label className='h6'>Username</label>
                    <ToastContainer />

                    <input
                      type="username"
                      className="form-control"
                      id="EmailInput"
                      name="EmailInput"
                      aria-describedby="emailHelp"
                      placeholder="Enter Username"
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                      {usernameError}
                    </small>
                  </div>
                  <br />
                  <div className="form-group">
                    <label className='h6' >Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                      {passwordError}
                    </small>
                  </div>
                  <br />
                  <button onClick={(e) => { loginSubmit(e) }} className="btn btn-primary mb-3 ">
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="row  m-2">
        <div className="col-lg-12 bg-primary border">
          <h4 className='text-center text-white'>footer</h4>
        </div>
      </div>
    </>

  );
}
export default Home;
