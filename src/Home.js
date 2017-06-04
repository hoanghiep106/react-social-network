import React from 'react';
import Slider from 'react-slick';

import Header from './Header.js'
import Footer from './Footer.js'
import Sider from './Sider.js'
import SingleProduct from './SingleProduct.js'

import products from './products.js'

const Carousel = (props) => (
  <div className="row carousel-holder">

      <div className="col-md-12">
          <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
              </ol>
              <div className="carousel-inner">
                  <div className="item active">
                      <img className="slide-image" src="images/banner-web.png" alt=""/>
                  </div>
                  <div className="item">
                      <img className="slide-image" src="images/banner-web.png" alt=""/>
                  </div>
              </div>
              <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left"></span>
              </a>
              <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right"></span>
              </a>
          </div>
      </div>

  </div>
);


function ProductSlider(props) {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        }
      ]
    };
    const ProductSlider = props.products.map(product => <div key={product._id} className="col-sm-3"><SingleProduct product={product} /></div>);
    return(
      <div>
        <h1 className="type-name">{props.name}</h1>
        <Slider {...settings}>
          {ProductSlider}
        </Slider>
      </div>
    );
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      fullkitTops: products.filter(product => product.type == "fullkit"),
      tankTops: products.filter(product => product.type == "fullkit"),
      bodyTops: products.filter(product => product.type == "fullkit"),
      juiceTops: products.filter(product => product.type == "fullkit"),
      accessoryTops: products.filter(product => product.type == "accessory")
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="row container-home">
          <Sider />
          <div className="col-md-9">
              <Carousel />
              <ProductSlider products={this.state.fullkitTops} name="Full kit"/>
              <ProductSlider products={this.state.tankTops} name="Đầu hút"/>
              <ProductSlider products={this.state.bodyTops} name="Thân"/>
              <ProductSlider products={this.state.juiceTops} name="Tinh dầu"/>
              <ProductSlider products={this.state.accessoryTops} name="Phụ kiện"/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;
