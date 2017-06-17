import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import LoginModal from './LoginModal.js'
import RegisterModal from './RegisterModal.js'
import NewFeed from './NewFeed.js'
import Helper from './Helper.js'
import AllActions from './AllActions.js'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowingLoginModal: false,
      isShowingRegisterModal: false,
      username: "",
    }
    this.openLoginModal = this.openLoginModal.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.closeRegisterModal = this.closeRegisterModal.bind(this);
    this.getRegisterInfo = this.getRegisterInfo.bind(this);
  }

  openLoginModal() {
    this.setState({
      isShowingLoginModal: true,
      isShowingRegisterModal: false
    })
  }

  closeLoginModal() {
    this.setState({
      isShowingLoginModal: false
    })
  }

  openRegisterModal() {
    this.setState({
      isShowingRegisterModal: true,
      isShowingLoginModal: false
      })
    }

  closeRegisterModal() {
    this.setState({
      isShowingRegisterModal: false
    })
  }

  getRegisterInfo(username) {
    this.setState({
      username: username
    })
  }

  render() {
      return(
              <div className="container-home row">
                <div className="col col-md-6 home-right">
                  <img width="150px" height="150px" src="images/Logo.png" />
                  <img className="home-logo-name" height="40px" src="images/name-logo-2x.png"/>
                  <h4 className="slogan">Nothing could be simpler</h4>
                  <div className="home-button">
                    <button className="login-register" onClick={this.openLoginModal}>Login</button>
                    { this.state.isShowingLoginModal &&
                      <ModalContainer onClose={this.closeLoginModal}>
                        <ModalDialog onClose={this.closeLoginModal}>
                          <LoginModal
                            openRegisterModal = {this.openRegisterModal}
                            username = {this.state.username}
                          />
                        </ModalDialog>
                      </ModalContainer>
                    }
                    <button className="login-register" onClick={this.openRegisterModal}>Register</button>
                    { this.state.isShowingRegisterModal &&
                      <ModalContainer onClose={this.closeRegisterModal}>
                        <ModalDialog onClose={this.closeRegisterModal}>
                          <RegisterModal
                            getRegisterInfo = {this.getRegisterInfo}
                            openLoginModal = {this.openLoginModal}
                          />
                        </ModalDialog>
                      </ModalContainer>
                    }
                  </div>
                </div>
                <div className="col col-md-6 hidden-sm-down home-left">
                  <img width="100%" src="images/LandingImage.png" />
                </div>
              </div>
            )
  }
}

export default Home;
