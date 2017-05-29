import React,{PropTypes} from 'react';
import axios from 'axios';
import Helper from './Helper.js'
import AllActions from './AllActions.js'

const SingleComment = (props) => (
      <div className="comment-box col-md-7">
        <div className="oneline">
          <div className="post-owner"><strong>{props.comment.owner}</strong></div>
          <div className="comment-content">{props.comment.content}</div>
        </div>
      </div>
)

function CommentList(props) {
    let commentList = "";
    if(props.comments[0]){
      commentList = props.comments.map(comment => <SingleComment key={comment.content} comment={comment}/>);
    }
    return(
      <div className="row">
        {commentList}
      </div>
    );
}

class CommentModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      post: {},
      newcomment: '',
      comments: '',
      commentStatus: false
    };
    this.loadComments = this.loadComments.bind(this);
    this.commentPost = this.commentPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    this.loadComments();
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  loadComments() {
    fetch(Helper.commentDataUrl + this.props.post.postID, {
            method: 'GET',
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
          if(response.Comment){
            this.setState({
              comments: response.Comment
            });
          }
        });
  }

  commentPost() {
    fetch(Helper.commentPostUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + AllActions.getCookie("access_token")
            },
            body: JSON.stringify({
              content: this.state.newcomment,
              owner: Helper.username,
              date: new Date,
              postID: this.props.post.postID
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
            this.setState({
              commentStatus: true
            });
            console.log("Commented");
            this.loadComments();
        });
  }

  render() {
      return (
        <div className="comment-modal col-md-7">
          <div className="post-content">
            <div className="post-owner">{this.props.post.owner}</div>
            <div>{this.props.post.content}</div>
            <img src={this.props.post.url} width="100%"/>
          </div>
          <div className="post-content">
            <div className="green pull-right like-box">{this.props.post.like} Like</div>
          </div>
          <div className="btn post-btn" onClick={this.props.likePost}>Like</div>
          <div className="comment-form">
            <textarea className="form-control post-input" type="text" name="newcomment" placeholder="What do you think about this?" onChange={this.handleInputChange}/>
            <div className="btn blue-btn" onClick={this.commentPost}>Post</div>
            { this.state.commentStatus ?
              <span className="green">Your comment is successfully posted.</span>
              :
              ""
            }
          </div>
          <CommentList
            comments = {this.state.comments}
          />
        </div>
      );
  }
}

export default CommentModal;
