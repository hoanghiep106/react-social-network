import React from 'react';

const Footer = (props) => (
      <div id="about" className="container footer">
          <div className="col-sm-5 top-50">
              <p>Địa chỉ: Số 134 Nghĩa Dũng, Phúc Xá, Ba Đình, Hà Nội</p>
              <p>Hotline: </p>
              <p>Facebook: </p>
          </div>
          <div className="col-sm-7 map">
            <iframe allowTransparency={true} frameBorder={0} scrolling="no" src="https://www.google.com/maps/d/u/0/embed?mid=1oGsPecGAVTK6Glfeb59GiNYOzJ4" width="600px" height="300px"></iframe>
          </div>
      </div>
);

export default Footer
