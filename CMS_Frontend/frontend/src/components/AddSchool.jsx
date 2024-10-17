import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSchool = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleAddSchool = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/schools/add_school", { name, address })
      .then((result) => {
        if (result.status === 201) {
          navigate("/admin_dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("School already exists or input is invalid. Please try again.");
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
            <b>Add </b>School
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Add a new school</p>
            <form onSubmit={handleAddSchool}>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="School Name"
                  value={name}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-school"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="School Address"
                  value={address}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-map-marker-alt"></span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Add School
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
