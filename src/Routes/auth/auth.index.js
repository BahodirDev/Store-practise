const { getAuthCtr } = require('./auth.ctr');
const route = require('express').Router();



route.post('/auth-user',getAuthCtr)


module.exports = route;