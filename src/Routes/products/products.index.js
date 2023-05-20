const { getProductCtr, postProductCtr, patchProductCtr, deleteProductCtr, saleProductCtr} = require('./products.ctr');

const route = require('express').Router();


route.get('/products-list', getProductCtr)
route.post('/products-post', postProductCtr)
route.patch('/products-patch/:product_id', patchProductCtr)
route.delete('/products-delete/:product_id', deleteProductCtr)

// logic route
// route.patch('/products-sale', saleProductCtr)

module.exports = route;