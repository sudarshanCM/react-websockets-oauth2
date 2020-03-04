import React, { Component } from "react";
import axios from "axios";
import { login } from "../functions/login";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isLoggedIn:false,
      userID:'',
      fbname:'',
      fbemail:''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // window.location.reload();
  // this.props.history.push('/home');

  onSubmit(e) {
    e.preventDefault();
    // alert(this.state.email);
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user).then(res => {
      if (res) {
        this.props.history.push({
          // pathname: `/join?email=${this.state.email}`,
          pathname: "/join",
          state: { email: this.state.email }
        });
      }
    });
  }

  responseGoogle = response => {
    console.log(response);
  };

  responseFacebook = response => {
    console.log("facebook....", response);
    if(response.status!=="unknown"){
      this.setState({
        isLoggedIn:true,
        userID:response.userID,
        fbname:response.name,
        fbemail:response.email
      })
    this.props.history.push('/join/');
    }
  };

  componentClicked = response => {
    console.log("hhhhh", response)
  };

  call() {
    axios
      .get("http://localhost:3007/user/auth/facebook")
      .then(res => console.log(res));
  }

  render() {
    let fbContent;

    if(this.state.isLoggedIn){
      fbContent=null;
    }
    else{
      fbContent=(
        <FacebookLogin
        appId="1111033332578658"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
      />
      )
    }
    return (
      <div className="container-login">
        <span className="input-group-btn">
          <Link to="/register">Click to Register</Link>
        </span>

        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Login</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
          {/* <div className="button" onClick={() => this.call()}>
            Facebook
          </div> */}
        </div>
        {/* <select onChange={e => this.handleChange(e)}>
          <option value=""></option>
          {this.state.locations.map(function(locations, i) {
            return (
              <option key={i} value={locations}>
                {locations}
              </option>
            );
          })}
        </select>

        <select>
          <option value=""></option>
          {this.state.destination.map(function(location, i) {
            return (
              <option key={i} value={location}>
                {location}
              </option>
            );
          })}
        </select> */}
        <br />
      <div>{fbContent}</div>
       
      </div>
    );
  }
}

export default Login;
