import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Admin_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/users/login", { email, password })
        .then(result => {
            if (result.status === 201) {
                navigate("/admin_dashboard");
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 400) {
                window.alert("Email already exists. Please use a different email.");
            } else {
                console.log(err);
            }
        });
};

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="/">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setEmail(e.target.value)} // Corrected syntax
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email} // Added value binding
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)} // Corrected syntax
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password} // Added value binding
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
              </a>
            </div>
            <p className="mb-1">
              <a href="/forgot-password">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;
