const BASE_URL = "https://vapeshop-api.herokuapp.com/"

const Helper = {
  getAllProductsUrl: BASE_URL + "api/v1/products",
  getProductByCategoryUrl: BASE_URL + 'api/v1/categories',
  getProductByNameUrl: BASE_URL + 'api/v1/products',
  addProductUrl: BASE_URL + 'api/v1/products',
  getAllCategoriesUrl: BASE_URL + 'api/v1/categories'
}

export default Helper;
