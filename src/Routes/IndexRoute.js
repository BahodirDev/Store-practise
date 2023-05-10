const route = require('express').Router();
const userRoute = require('./user/users.index')

route.use('/users',userRoute)

module.exports = route;