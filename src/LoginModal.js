import React,{PropTypes} from 'react';

import Helper from './Helper.js'
import AllActions from './AllActions.js'

class LoginModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      password: '',
      error: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    if(name == "username") {
      AllActions.setCookie("username", value, 1);
    }
    this.setState({
      [name]: value
    });
  }

  getToken() {
    fetch(Helper.authorizationUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            if (!response) {
                this.setState({
                  error: true
                });
            } else{
                console.log(response.access_token);
                AllActions.setCookie("username", this.state.username, 1);
                AllActions.setCookie("password", this.state.password, 1);
                AllActions.setCookie("access_token", response.access_token, 1);
                window.location.hash = "newfeed";
            }
        });
  }

  render() {
      return (
        <form className="login">
          <h3>Login</h3>
          <div className="mt-2">
            {this.props.username ?
              <input className="form-control" type="text" name="username" placeholder={this.props.username} onChange={this.handleInputChange}/>
              :
              <input className="form-control" type="text" name="username" placeholder="Username" onChange={this.handleInputChange}/>
            }
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
            {
              this.state.error ?
              <span className="red">{"Username and password are not match."}</span>
              :""
            }
          </div>
              <div className="btn btn-primary" onClick={this.getToken}>
                  Login
              </div>
              <div className="btn btn-primary" onClick={this.props.openRegisterModal}>
                  Register
              </div>
        </form>
      );
  }
}

export default LoginModal;
