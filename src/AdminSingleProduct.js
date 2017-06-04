import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import Helper from './Helper.js'

class AdminSingleProduct extends React.Component  {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isShowingEditModal: false,
      name: this.props.product.name,
      color: this.props.product.color,
      image: this.props.product.image,
      price: this.props.product.price,
      quantity: this.props.product.quantity,
      category_id: this.props.product.category_id
    }
    this.editData = this.editData.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  editData() {
    fetch(Helper.addProductUrl + "/" + this.props.product._id, {
            method: 'PUT',
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
          this.setState({
            isShowingEditModal: false
          })
          this.props.loadAllProducts();
          console.log("Edited a product")
        });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  openEditModal() {
    this.setState({
      isShowingEditModal: true
    })
  }

  closeEditModal() {
    this.setState({
      isShowingEditModal: false
    })
  }

  deleteProduct() {
    fetch(Helper.addProductUrl + "/" + this.props.product._id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return null
            }
        }).then((response) => {
          this.props.loadAllProducts();
          console.log("Deleted a product")
        });
  }

  render() {
    return (
      <tr>
        <td>{this.props.product._id}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.color}</td>
        <td>{this.props.product.image}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.quantity}</td>
        {this.props.categories && this.props.categories.length ?
          <td>{this.props.categories[this.props.product.category_id -1].name}</td>
          :
          null
        }
        <td><div onClick={this.openEditModal}>Edit</div></td>
        <td><div onClick={this.deleteProduct}>Delete</div></td>
        { this.state.isShowingEditModal &&
          <ModalContainer onClose={this.closeEditModal}>
            <ModalDialog onClose={this.closeEditModal}>
              <div className="row post-form">
                <input className="col-sm-2" type="text" name="name" placeholder={this.props.product.name} onChange={this.handleInputChange} required/>
                <input className="col-sm-1" type="text" name="color" placeholder={this.props.product.color} onChange={this.handleInputChange}/>
                <input className="col-sm-2" type="text" name="image" placeholder={this.props.product.image} onChange={this.handleInputChange}/>
                <input className="col-sm-2" type="text" name="price" placeholder={this.props.product.price} onChange={this.handleInputChange}/>
                <input className="col-sm-1" type="number" min="0" name="quantity" placeholder={this.props.product.quantity} onChange={this.handleInputChange}/>
                {this.props.categories && this.props.categories.length ?
                <select className="col-sm-1" name="category" onChange={this.handleInputChange}>
                  <option value={this.props.categories[0]._id}>{this.props.categories[0].name}</option>
                  <option value={this.props.categories[1]._id}>{this.props.categories[1].name}</option>
                  <option value={this.props.categories[2]._id}>{this.props.categories[2].name}</option>
                  <option value={this.props.categories[3]._id}>{this.props.categories[3].name}</option>
                  <option value={this.props.categories[4]._id}>{this.props.categories[4].name}</option>
                </select>
                :
                null
                }
                <br />
                <div className="blue-btn" onClick={this.editData}>Apply changes</div>
              </div>
            </ModalDialog>
          </ModalContainer>
        }
      </tr>
    );
  }
};

export default AdminSingleProduct
