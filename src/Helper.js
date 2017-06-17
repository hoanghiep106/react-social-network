const LOCAL_URL = 'http://localhost:3000/';
const BASE_URL = 'http://161.202.20.61:5000/';

let Helper = {
  authorizationUrl : BASE_URL + 'auth',
  registerUrl: BASE_URL + 'reguser',
  newfeedDataUrl: BASE_URL + 'postnewfeed?name=',
  postDataUrl: BASE_URL + 'post',
  likePostUrl: BASE_URL + 'likepost',
  commentPostUrl: BASE_URL + 'postcmt',
  commentDataUrl: BASE_URL + 'postcmt?postID=',
  getUserUrl: BASE_URL + 'user?name=',
  getUserPostUrl: BASE_URL + 'post?name=',
  followUserUrl: BASE_URL + 'flwuser',
  unfollowUserUrl: BASE_URL + 'unflwuser',
  avatarUploadUrl: BASE_URL + 'userimg',
  localURL: LOCAL_URL,
}

export default Helper
