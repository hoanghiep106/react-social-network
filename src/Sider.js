import React from 'react';
import {Link} from 'react-router';

const Sider = (props) => (
  <div className="col-md-3">
    <div className="lead">Danh sách sản phẩm</div>
    <div className="row row-sider">
      <Link to="/fullkit" className="list-group-item">Full kit</Link>
      <Link to="/body" className="list-group-item">Thân máy</Link>
      <Link to="/tank" className="list-group-item">Đầu hút</Link>
      <Link to="/juice" className="list-group-item">Tinh dầu</Link>
      <Link to="/accessory" className="list-group-item">Phụ kiện</Link>
    </div>
  </div>
);

export default Sider
