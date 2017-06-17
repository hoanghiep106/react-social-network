import Helper from './Helper.js'
import axios from 'axios'

const allAction = {

  setCookie: function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getCookie: function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  },

  checkCookie: function() {
    let username = this.getCookie("username");
    let password = this.getCookie("password");
    if (username != "" && password != "") {
      fetch(Helper.authorizationUrl, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                username: username,
                password: password
              })
          }).then((response) => {
              if (response.ok) {
                  return response.json()
              } else {
                  return null
              }
          }).then((response) => {
              this.setCookie("access_token", response.access_token, 1);
              return response.access_token
          });
    } else {
      return ""
    }
  }
};

export default allAction
