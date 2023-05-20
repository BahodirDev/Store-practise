const route = require('express').Router();
const userRoute = require('./user/users.index')
const productsRoute = require('./products/products.index')
const Auth = require('./auth/auth.index');

// auth
route.use('/auth',Auth)



route.use('/users',userRoute)
route.use('/products',productsRoute)

module.exports = route;