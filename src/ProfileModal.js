import React,{PropTypes} from 'react';

import Helper from './Helper.js';
import PostList from './PostList.js';
import AllActions from './AllActions.js'

class ProfileModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      posts: [],
      newpost: '',
      postStatus: false
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserPost = this.getUserPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postData = this.postData.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  componentDidMount(){
    this.getUserInfo();
    this.getUserPost();
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
            this.getUserPost();
          }
        });
  }

  postData() {
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
              postStatus: true
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
            this.setState({
              userInfo: response
            });
            console.log(response);
        })
  }

  getUserPost() {
       fetch(Helper.getUserPostUrl + this.props.username + '&postID=0', {
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
            if (response.posts && response.posts.length) {
              this.setState({
                posts: response.posts
              });
            }
        })
  }

  render() {
      return (
       <div className="comment-modal col-md-7">
         <div className="post-content">
           <div className="post-owner">{this.state.userInfo ? this.state.userInfo.name : "Loading..."}</div>
           <div>{this.state.userInfo ? this.state.userInfo.birthday : "DD_MM_YYYY"}</div>
         </div>
         <div className="post-content">
           <div className="green pull-right like-box">Follower {this.state.userInfo.followings_name ? this.state.userInfo.followings_name.length - 1 : "..."}</div>
           <div className="green pull-right like-box">Following {this.state.userInfo.followers_name ? this.state.userInfo.followers_name.length - 1 : "..."}</div>
         </div>
         <div className="btn blue-btn" onClick={this.followUser}>Follow</div>
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
           ""
         }
         <PostList posts = {this.state.posts} profile = {true}/>
       </div>
      );
  }
}

export default ProfileModal;
