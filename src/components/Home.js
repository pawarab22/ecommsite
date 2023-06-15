import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {

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
      axios.post('http://localhost:8081/authentication/login', {
        username: username,
        password: password
      }).then((response) => {
        if (response.data.status === "success") {
          navigate("/products");
        }
        else {
          alert('invalid credentials...!');
        }
      })
    }
  }

  return (
    <>
      <div className="container mt-3 border ">
        <h2 className='text-center mt-4 text-primary'><u> User Credentials </u> </h2>
        <div className="">
          <div className="">
            <div className="row d-flex justify-content-center">
              <div className="col-md-4">
                <form id="loginform" className='m-4' onSubmit={loginSubmit}>
                  <div className="form-group">
                    <label className='h6'>Username</label>
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
                  <button type="submit" className="btn btn-primary mb-3 ">
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
