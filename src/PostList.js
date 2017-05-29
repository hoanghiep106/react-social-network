import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import Helper from './Helper.js';
import CommentModal from './CommentModal.js';
import ProfileModal from './ProfileModal.js';
import AllActions from './AllActions.js';

class SinglePost extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingCommentModal: false,
      isShowingProfileModal: false,
      liked: false
    };
    this.likePost = this.likePost.bind(this);
    this.checkLiked = this.checkLiked.bind(this);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.closeCommentModal = this.closeCommentModal.bind(this);
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
  }

  componentDidMount(){
    this.checkLiked();
  }

  openCommentModal() {
    this.setState({
      isShowingCommentModal: true,
      isShowingProfileModal: false
    })
  }

  closeCommentModal() {
    this.setState({
      isShowingCommentModal: false
    })
  }

  openProfileModal() {
    this.setState({
      isShowingProfileModal: true,
      isShowingCommentModal: false
    })
  }

  closeProfileModal() {
    this.setState({
      isShowingProfileModal: false
    })
  }

  likePost() {
    fetch(Helper.likePostUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              postID: this.props.post.postID,
              action: "like"
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            console.log("Liked");
            this.checkLiked();
        });
  }

  checkLiked() {
    fetch(Helper.likePostUrl + "?postID=" + this.props.post.postID, {
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
            console.log(response);
        });
  }

  unlikePost() {
    fetch(Helper.likePostUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              postID: this.props.post.postID,
              action: "unlike"
            })
        }).then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then(function(response) {
            console.log("Unliked");
            this.checkLiked();
        });
  }

  render(){
    let boxClass = "post-box";
    if(this.props.profile){
     boxClass = "profile-post-box";
    }
    return(
      <div className={boxClass + " col-md-7"}>
        <div className="post-content">
          <div className="post-owner" onClick={this.openProfileModal}><strong>{this.props.post.owner}</strong></div>
          <div className="content">{this.props.post.content}</div>
          <img src={this.props.post.url} width="100%"/>
        </div>
        <div className="post-content">
          <div className="green pull-right like-box">{this.props.post.like} Like</div>
        </div>
        <div className="inline-block">
          <div className="btn post-btn" onClick={this.likePost}>Like</div>
          <div className="btn post-btn" onClick={this.openCommentModal}>Comment</div>
        </div>
        { this.state.isShowingCommentModal &&
          <div className="comment-modal">
            <ModalContainer onClose={this.closeCommentModal}>
              <ModalDialog onClose={this.closeCommentModal}>
                <CommentModal
                  post={this.props.post}
                  likePost={this.likePost}
                />
              </ModalDialog>
            </ModalContainer>
          </div>
        }
        { this.state.isShowingProfileModal &&
          <ModalContainer onClose={this.closeProfileModal}>
            <ModalDialog onClose={this.closeProfileModal}>
              <ProfileModal
               username = {this.props.post.owner}
              />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

function PostList(props) {
    const postList = props.posts.map(post => <SinglePost key={post.postID} post={post} profile={props.profile}/>);
    return(
      <div className="row">
        {postList}
      </div>
    );
}

export default PostList;
