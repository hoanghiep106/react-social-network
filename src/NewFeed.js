import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import FormData from 'form-data';

import Header from './Header.js';
import Helper from './Helper.js';
import ProfileModal from './ProfileModal.js';
import CommentModal from './CommentModal.js';
import PostList from './PostList.js';
import AllActions from './AllActions.js';

class NewFeed extends React.Component {

  constructor() {
    super();
    this.state = {
      posts: [],
      newpost: "",
      postStatus: false,
      isShowingProfileModal: false,
      file: '',
      imagePreviewUrl: ''
    };
    this.postData = this.postData.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  componentDidMount(){
    this.loadData();
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

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  resetAccessToken(){
    document.cookie = "";
    window.location.hash = "";
  }

  postData() {
    let formData = new FormData();
    formData.append('content', this.state.newpost);
    formData.append('owner', AllActions.getCookie("username"));
    formData.append('date', Date.now());
    formData.append('file', this.state.file);
    fetch(Helper.postDataUrl, {
            method: 'POST',
            headers: {
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: formData
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            this.setState({
              postStatus: true,
              file: '',
              imagePreviewUrl: ''
            });
            console.log("Post Successfully");
            this.loadData();
        });
  }

   _handleSubmit(e) {
     e.preventDefault();
     // TODO: do something with -> this.state.file
     console.log('handle uploading-', this.state.file);
   }

   _handleImageChange(e) {
     e.preventDefault();
     let reader = new FileReader();
     let file = e.target.files[0];

     reader.onloadend = () => {
       this.setState({
         file: file,
         imagePreviewUrl: reader.result
       });
     }
     reader.readAsDataURL(file)
   }

  loadData() {
    fetch(Helper.newfeedDataUrl + AllActions.getCookie("username") + "&postID=0", {
            method: 'GET',
            headers: {
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
          this.setState({
            posts: response.posts
          });
        });
  }

  render() {
      return (
        <div>
          <Header
            openProfileModal = {this.openProfileModal}
            resetAccessToken = {this.resetAccessToken}
          />
          <div className="container post-list">
            <div className="post-form">
              <textarea className="form-control post-input" type="text" name="newpost" placeholder="What are you thinking?" onChange={this.handleInputChange}/>

              <div className="previewComponent">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input className="fileInput"
                    type="file"
                    onChange={(e)=>this._handleImageChange(e)} />
                </form>
                <div className="imgPreview">
                  {this.state.imagePreviewUrl != "" ?
                    <img src={this.state.imagePreviewUrl} width="300px"/>
                    :
                    ""
                  }
                </div>
              </div>

              <div className="btn blue-btn" onClick={this.postData}>Post</div>
              { this.state.postStatus ?
                <span className="green">Posted to your wall</span>
                :
                ""
              }
              { this.state.isShowingProfileModal &&
                <ModalContainer onClose={this.closeProfileModal}>
                  <ModalDialog onClose={this.closeProfileModal}>
                    <ProfileModal
                     username = {AllActions.getCookie("username")}
                    />
                  </ModalDialog>
                </ModalContainer>
              }
            </div>
            <PostList posts = {this.state.posts}/>
          </div>
        </div>
      );
  }
}

export default NewFeed;
