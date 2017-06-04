import React from 'react';

const Header = (props) => (
  <nav className="navbar navbar-inverse" role="navigation">
      <div className="container">

          <div className="row navbar-collapse">
              <ul className="nav navbar-nav top-55">
                  <li>
                      <div className="navbar-brand">Vapeshop.vn</div>
                  </li>
                  <li>
                      <div>Liên hệ</div>
                  </li>
              </ul>
              <img className="top-logo margin-left-logo" width="100px" src="images/logo.png"/>
              <form className="form-inline pull-right top-55">
                <div className="top-search">
                  <input className="form-control mr-sm-2" type="text" placeholder="Tìm đơn hàng" />
                  <button className="btn btn-outline-success my-2 my-sm-0 button-search">Tìm</button>
                </div>
              </form>
          </div>
      </div>
  </nav>
);

export default Header
