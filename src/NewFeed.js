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
      currentLastPostId: 0,
      endOfPostList: false,
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

  componentDidMount() {
    if(AllActions.getCookie("access_token") && AllActions.getCookie("access_token") !== '""'){
      this.loadData();
    } else window.location.hash = "";
  }

  componentWillUnMount() {
    this.cleanup = () => {
      window.addEventListener("scroll", (evt) => {
        if(this.state.posts.length - this.state.currentLastPostId == 10 && document.body.scrollTop !== 0 && document.body.scrollHeight - document.body.scrollTop == window.innerHeight){
          let currentLastPostId = this.state.currentLastPostId + 10;
          this.setState({
            currentLastPostId
          });
          setTimeout(this.loadData(), 1500);
        }
      });
    }
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

  resetAccessToken() {
    document.cookie = 'username="";';
    document.cookie = 'password="";';
    document.cookie = 'access_token="";';
    window.location.hash = "";
  }

  postData() {
    this.setState({
      posting: true
    })
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
              imagePreviewUrl: '',
              posting: false
            });
            console.log("Post Successfully");
            location.reload();
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
    console.log("Loading data...")
    fetch(Helper.newfeedDataUrl + AllActions.getCookie("username") + "&postID=" +  this.state.currentLastPostId, {
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
          if(response.posts && response.posts.length){
            let posts = this.state.posts.concat(response.posts);
            this.setState({
              posts
            });
          } else {
            this.setState({
              endOfPostList: true,
            });
            console.log(this.state.endOfPostList);
          }
        });
  }

  render() {
      window.addEventListener("scroll", (evt) => {
        if(this.state.posts.length - this.state.currentLastPostId == 10 && document.body.scrollTop !== 0 && document.body.scrollHeight - document.body.scrollTop == window.innerHeight){
          let currentLastPostId = this.state.currentLastPostId + 10;
          this.setState({
            currentLastPostId
          });
          setTimeout(this.loadData(), 1500);
        }
      });
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
            {this.state.posts.length ?
              <PostList posts = {this.state.posts}/>
              :
              ""
            }
            {this.state.endOfPostList || (this.state.posts.length - this.state.currentLastPostId !== 10 && this.state.posts.length !== 0)?
              null
              :
              <div className="ld ld-hourglass ld-spin-fast text-center" style={{fontSize: "64px", color: "#3498db", marginLeft: "5%"}}></div>
            }
            {this.state.posting ?
              <div className="ld ld-hourglass ld-spin-fast text-center" style={{fontSize: "64px", color: "#3498db", marginLeft: "5%"}}></div>
              :
              null
            }
          </div>
        </div>
      );
  }
}

export default NewFeed;
