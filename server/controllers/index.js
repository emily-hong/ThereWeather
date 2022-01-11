module.exports = {
  auth: require("./get/auth"),
  bookmark: require("./post/bookmark"),
  codi: require("./get/codi"),
  mypage: require("./get/mypage"),
  mypost: require("./get/mypost"),
  readpost: require("./get/readpost"),
  commentlist: require("./get/commentlist"),
  bookmarklist: require("./post/bookmarklist"),
  home: require("./post/home"),
  map: require("./post/map"),
  login: require("./post/login"),
  signout: require("./post/signout"),
  post: require("./post/write"),
  sendcomment: require("./post/sendcomment"),
  readbookmark: require("./post/readbookmark"),
  password: require("./put/password"),
  edituserinfo: require("./put/edituserinfo"),
  userphoto: require("./put/userphoto"),
  editpost: require("./put/editpost"),
  checkuser: require("./put/checkuser"),
  deletepost: require("./del/deletepost"),
  removeuser: require("./del/removeuser"),
  sociallogin: require("./post/sociallogin"),
  kakaologin: require("./post/kakaologin"),
  ////////
  map2: require("./post/map2"),
  usersController: require("./users"),
  postsController: require("./post"),
  chatsController: require("./chat"),
};