//React libraries
import { Router, Route, hashHistory } from 'react-router'
import ReactDOM from 'react-dom';
import React from 'react';

//Import Container component
import Home from './Home.js';
import NewFeed from './NewFeed.js'
import AllActions from './AllActions.js'

class AppRoute extends React.Component {

  componentDidMount(){
      if(AllActions.getCookie("access_token") && AllActions.getCookie("access_token") !== '""'){
        window.location.hash = "newfeed";
      } else window.location.hash = "";
  }

  render() {
    return(
      <Router history={hashHistory}>
          <Route path="/" component={Home} />
          <Route path="/newfeed" component={NewFeed}/>
      </Router>
    )
  }
}

ReactDOM.render(<AppRoute />, document.getElementById('contents'));
