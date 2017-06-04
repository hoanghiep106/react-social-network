import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import Helper from './Helper.js'
import AdminSingleProduct from './AdminSingleProduct.js'

function ProductTable(props) {
  const productRows = props.products.map(product =>
    <AdminSingleProduct key={product._id} product={product} categories={props.categories} loadAllProducts={props.loadAllProducts}/>
  );
  return (
    <div className="admin-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Color</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>{productRows}</tbody>
    </div>
  );
}

class AdminPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      products: [],
      categories: [],
    };
    this.loadAllProducts = this.loadAllProducts.bind(this);
    this.loadCategories = this.loadCategories.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    this.loadAllProducts();
    this.loadCategories();
  }

  componentDidUpdate(prevProps) {
    //this.loadAllProducts();
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    console.log(value);
  }

  postData() {
    fetch(Helper.addProductUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.state.name,
              color: this.state.color,
              image: this.state.image,
              price: this.state.price,
              quantity: this.state.quantity,
              category_id: this.state.category_id
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
          this.loadAllProducts();
          console.log("Added a new product")
        });
  }

  loadAllProducts() {
    fetch(Helper.getAllProductsUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else
              return null;
        }).then((response) => {
          console.log(response.products);
          this.setState({products: response.products});
        });
  }

  loadCategories() {
    fetch(Helper.getAllCategoriesUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else
              return null;
        }).then((response) => {
          console.log(response.categories);
          this.setState({categories: response.categories});
        });
  }

  render() {
    return (
      <div className="admin-container">
          <div className="row post-form">
            <input className="col-sm-2" type="text" name="name" placeholder="Product name" onChange={this.handleInputChange} required/>
            <input className="col-sm-1" type="text" name="color" placeholder="Product color" onChange={this.handleInputChange}/>
            <input className="col-sm-2" type="text" name="image" placeholder="Product image url" onChange={this.handleInputChange}/>
            <input className="col-sm-2" type="text" name="price" placeholder="Product price" onChange={this.handleInputChange}/>
            <input className="col-sm-1" type="number" min="0" name="quantity" placeholder="Product quantity" onChange={this.handleInputChange}/>
            {this.state.categories && this.state.categories.length ?
            <select className="col-sm-1" name="category_id" onChange={this.handleInputChange}>
              <option></option>
              <option value={this.state.categories[0]._id}>{this.state.categories[0].name}</option>
              <option value={this.state.categories[1]._id}>{this.state.categories[1].name}</option>
              <option value={this.state.categories[2]._id}>{this.state.categories[2].name}</option>
              <option value={this.state.categories[3]._id}>{this.state.categories[3].name}</option>
              <option value={this.state.categories[4]._id}>{this.state.categories[4].name}</option>
            </select>
            :
            null
            }
            <br />
            <div className="blue-btn" onClick={this.postData}>Add</div>
          </div>
          <ProductTable
            products={this.state.products}
            categories={this.state.categories}
            loadAllProducts={this.loadAllProducts}
          />
      </div>
    );
  }
}

export default AdminPage;
