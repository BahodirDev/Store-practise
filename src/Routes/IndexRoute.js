const route = require('express').Router();
const userRoute = require('./user/users.index')
const Auth = require('./auth/auth.index');

// auth
route.use('/auth',Auth)



route.use('/users',userRoute)

module.exports = route;