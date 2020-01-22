import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Register = (props) => {

  //console.log('REGISTER PROPS', props);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setErrors] = useState({})

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      props.history.push("/");
    }

    if (errors) {
      setErrors({
        error: errors
      });
    }

  }, [auth, errors])


  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };

    dispatch(registerUser(newUser, props.history));
  };


    return (
      <div className="container">
        <div className="row">
          <div className="col-md8">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  onChange={(event) => { setName(event.target.value )}}
                  value={name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className='form-control {classnames("", {
                    invalid: errors.name
                  })}'
                />
                <label htmlFor="name">Name</label>
                <span>{errors.name}</span>
              </div>
              <div className='form-group'>
                <input
                  onChange={(event) => { setEmail(event.target.value )}}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className=' form-control {classnames("", {
                    invalid: errors.email
                  })}'
                />
                <label htmlFor="email">Email</label>
                <span >{errors.email}</span>
              </div>
              <div className="form-group">
                <input
                  onChange={(event) => { setPassword(event.target.value )}}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className='form-control {classnames("", {
                    invalid: errors.password
                  })}'
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="form-group">
                <input
                  onChange={(event) => { setPassword2(event.target.value )}}
                  value={password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className='form-control {classnames("", {
                    invalid: errors.password2
                  })}'
                />
                <label htmlFor="password2">Confirm Password</label>
                <span >{errors.password2}</span>
              </div>
              <div  style={{ paddingLeft: "0px" }}>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Register