import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setErrors] = useState({})

  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)

  const dispatch = useDispatch();

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      props.history.push("/landing");
    }

    if (errors) {
      setErrors({
        error: errors
      });
    }

  }, [auth, errors])

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    dispatch(loginUser(userData));
  };


    return (
      
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col-md-8">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div  style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Admin Login</b>
              </h4>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  onChange={(event) => { setEmail(event.target.value )}}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className='form-control {classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}'
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className='form-group'>
                <input
                  onChange={(event) => {setPassword(event.target.value)}}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className='form-control {classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}'
                />
                <label htmlFor="password">Password</label>
                <span>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default Login
