const route = require('express').Router();
const userRoute = require('./user/users.index')
const productsRoute = require('./products/products.index')
const Auth = require('./auth/auth.index');
const reportsRoute = require('./reports/reports.index')

// auth
route.use('/auth',Auth)



route.use('/users',userRoute)
route.use('/products',productsRoute)
route.use('/reports', reportsRoute)

module.exports = route;