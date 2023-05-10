const { getUsersCtr, postUsersCtr, patchtUsersCtr} = require('./users.ctr');

const route = require('express').Router();

route.get('/users-list',getUsersCtr)
route.post('/users-post',postUsersCtr)
route.patch('/users-patch/:user_id',patchtUsersCtr)

module.exports = route;