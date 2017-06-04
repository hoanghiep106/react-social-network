import React from 'react';

class SingleProduct extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
            <div className="thumbnail">
              <img className="product-photos" src={this.props.product.image} alt=""/>
              <div className="caption">
                  <h4 className="name-font-size">{this.props.product.name + " " + this.props.product.color}</h4>
                  <h4 className="price-font-size">{this.props.product.price.toFixed(0).replace(/./g, function(c, i, a) {return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;}) + ".000"}</h4>
                  <a href="#" className="btn buy-button pull-right">Đặt hàng</a>
              </div>
            </div>
    )
  }
}

export default SingleProduct;
