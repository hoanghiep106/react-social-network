import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import ProfileModal from './ProfileModal.js';

class Header extends React.Component{
  constructor() {
    super();
    this.state = {
      username: '',
      isShowingProfileModal: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  openProfileModal() {
    this.setState({
      isShowingProfileModal: true
    })
  }

  closeProfileModal() {
    this.setState({
      isShowingProfileModal: false
    })
  }

  render() {
    return (
      <nav className="navbar">
              <div className="row container">
                      <div className="col-xs-5 logo-header">
                        <img className="logo" width="38px" height="38px" src="images/logo.png"/>
                        <img className="logo-name" height="30px" src="images/name-logo-2x.png"/>
                      </div>
                      <div className="col-xs-5 search-form">
                        <input className="form-control mr-sm-2" type="text" name="username" placeholder="Search for username" onChange={this.handleInputChange}/>
                        <div className="btn button-search" onClick={this.openProfileModal}>
                            <img width="20px" src="images/magnifying-glass-icon.png" />
                        </div>
                      </div>
                      <div className="col-xs-2">
                        <div className="btn-logout" onClick={this.props.resetAccessToken}>Logout</div>
                      </div>
                  { this.state.isShowingProfileModal &&
                    <ModalContainer onClose={this.closeProfileModal}>
                      <ModalDialog onClose={this.closeProfileModal}>
                        <ProfileModal
                         username = {this.state.username}
                        />
                      </ModalDialog>
                    </ModalContainer>
                  }
              </div>
      </nav>
    );
  }
}

export default Header;
