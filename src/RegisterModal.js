import React, {PropTypes} from 'react';

import Helper from './Helper.js';

class RegisterModal extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        birthday: '',
        isPasswordMatch: true,
        registered: false,
        error: false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.postRegistration = this.postRegistration.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let isPasswordMatch;

    if(name == "confirmPassword"){
      if( value !== this.state.password){
        isPasswordMatch = false;
      } else {
        isPasswordMatch = true;
      }
      this.setState({
        isPasswordMatch: isPasswordMatch
      });
    } else{
      this.setState({
        [name]: value
      });
    }
  }

  postRegistration() {
      fetch(Helper.registerUrl, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                birthday: this.state.birthday
              })
          }).then((response) => {
              if (response.ok) {
                  return response.json()
              } else {
                  return null
              }
          }).then((response) => {
            if(!response) {
              this.setState({
                error: true
              });
            } else{
              console.log("Successfully registered.");
              this.setState({
                registered: true,
                error: false
              });
              this.props.getRegisterInfo(this.state.username);
            }
          });
  }

  render() {
      return (
        <form className="register">
          <h3>Register</h3>
          <div className="mt-2">
            <input className="form-control" type="text" name="username" placeholder="Username" onChange={this.handleInputChange}/>
            <input className="form-control" type="text" name="birthday" placeholder="Birthday" onChange={this.handleInputChange}/>
            <input className="form-control" type="password" name="password" placeholder="Password" onChange={this.handleInputChange}/>
            <input className="form-control" type="password" name="confirmPassword" placeholder="Confirm password" onChange={this.handleInputChange}/>
            {
              !this.state.isPasswordMatch ?
              <span className="red">{"Passwords don't match"}</span>
              :""
            }
            {
              this.state.registered ?
              <div>
                <span className="green">
                  {"Successfully registered. Please go back to "}
                  <div className="blue" onClick={this.props.openLoginModal}>Login.</div>
                </span>
              </div>
              :""
            }
            {
              this.state.error ?
              <span className="red">{"Please try another username."}</span>
              :""
            }
          </div>
          <div className="btn btn-primary" onClick={this.postRegistration}>
            Register
          </div>
        </form>
      );
  }
}

export default RegisterModal;
