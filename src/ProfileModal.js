import React,{PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import Helper from './Helper.js';
import PostList from './PostList.js';
import AllActions from './AllActions.js'

class ProfileModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      followed: false,
      posts: [],
      currentLastPostId: 0,
      newpost: '',
      postStatus: false,
      isShowingAvatarUpload: false,
      file: '',
      imagePreviewUrl: '',
      posting: false
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserPost = this.getUserPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postData = this.postData.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.openAvatarUpload = this.openAvatarUpload.bind(this);
    this.closeAvatarUpload = this.closeAvatarUpload.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  componentDidMount(){
    this.getUserInfo();
    this.getUserPost();
  }

  openAvatarUpload(){
      this.setState({
        isShowingAvatarUpload: true
      })
  }

  closeAvatarUpload(){
      this.setState({
        isShowingAvatarUpload: false
      })
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  followUser() {
    fetch(Helper.followUserUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              following: this.props.username
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
          if(response.message){
           console.log(response.message)
          } else {
            console.log(`Following ${this.props.username}`);
            this.getUserInfo();
            this.props.closeProfileModal();
            location.reload();
          }
        });
  }

  unfollowUser() {
    fetch(Helper.unfollowUserUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              unfollowing: this.props.username
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
          if(response.message){
           console.log(response.message)
          } else {
            console.log(`Unfollowing ${this.props.username}`);
            this.getUserInfo();
            this.getUserPost();
          }
        });
  }

  postData() {
    this.setState({
      posting: true
    })
    fetch(Helper.postDataUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              content: this.state.newpost,
              owner: AllActions.getCookie("username"),
              date: Date.now(),
              like: 0
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            this.setState({
              postStatus: true,
              posting: false
            });
            console.log("Post Successfully");
            this.getUserPost();
        });
  }

  getUserInfo() {
        fetch(Helper.getUserUrl + this.props.username + '&action=getInfo', {
            method: "GET",
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
            let followed = false;
            for(let i = 0; i < response.followings_name.length; i++){
              if(AllActions.getCookie('username') == response.followings_name[i]){
                followed = true;
              }
            }
            this.setState({
              userInfo: response,
              followed
            });
            console.log(response);
        })
  }

  getUserPost() {
       fetch(Helper.getUserPostUrl + this.props.username + '&postID=' + this.state.currentLastPostId, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            let posts = this.state.posts.concat(response.posts);
            let currentLastPostId = this.state.currentLastPostId + 10;
            if (response.posts && response.posts.length) {
              this.setState({
                posts,
                currentLastPostId
              });
            }
        })
  }

  loadMore() {
    this.getUserPost();
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

  uploadAvatar() {
    let formData = new FormData();
    formData.append('file', this.state.file);
    console.log(this.state.file);
    fetch(Helper.avatarUploadUrl, {
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
            this.closeAvatarUpload()
            console.log("Upload Successfully");
            this.getUserInfo();
        });
  }

  render() {
      return (
       <div className="comment-modal col-md-7">
         <div className="profile-info">
          {AllActions.getCookie("username") == this.state.userInfo.name ?
            <div onClick={this.openAvatarUpload}>
              <img className="avatar" src={this.state.userInfo.avatar} width="85px" height="80px" />
            </div>
            :
           <img className="avatar" src={this.state.userInfo.avatar} width="85px" height="80px" />
          }
           <div className="profile-name">{this.state.userInfo ? this.state.userInfo.name : "Loading..."}</div>
           <div className="profile-birthday">{this.state.userInfo ? this.state.userInfo.birthday : "DD_MM_YYYY"}</div>
           {AllActions.getCookie("username") == this.state.userInfo.name ?
             null
             :
             (this.state.followed ?
               <div className="btn blue-btn follow-btn" onClick={this.unfollowUser}>Unfollow</div>
               :
               <div className="btn blue-btn follow-btn" onClick={this.followUser}>Follow</div>
             )
           }
             <div className="follow-info">
               <div className="green follow-box">Follower {this.state.userInfo.followings_name ? this.state.userInfo.followings_name.length - 1 : "..."}</div>
               <div className="green follow-box">Following {this.state.userInfo.followers_name ? this.state.userInfo.followers_name.length - 1 : "..."}</div>
              </div>
         </div>
         {this.props.username == AllActions.getCookie("username") ?
           <div className="comment-form">
             <textarea className="form-control post-input" type="text" name="newpost" placeholder="Post something to your wall." onChange={this.handleInputChange}/>
             <div className="btn blue-btn" onClick={this.postData}>Post</div>
             { this.state.postStatus ?
               <span className="green">Posted to your wall.</span>
               :
               ""
             }
           </div>
           :
           <div className="no-comment-form">
           </div>
         }
         <PostList posts = {this.state.posts} profile = {true}/>
         {this.state.posts.length && this.state.posts.length === this.state.currentLastPostId?
           <div className="btn blue-border-btn" onClick={this.loadMore}>Load more</div>
           :
           ""
         }
         { this.state.isShowingAvatarUpload &&
           <ModalContainer onClose={this.closeAvatarUpload}>
             <ModalDialog onClose={this.closeAvatarUpload}>
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
                 <div className="btn blue-btn" onClick={this.uploadAvatar}>Upload</div>
               </div>
             </ModalDialog>
           </ModalContainer>
         }
         {this.state.posting ?
           <div className="ld ld-hourglass ld-spin-fast text-center" style={{fontSize: "32px", color: "#3498db"}}></div>
           :
           null
         }
       </div>
      );
  }
}

export default ProfileModal;
