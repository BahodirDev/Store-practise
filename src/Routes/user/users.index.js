const { createUsersValidation, patchUsersValidation } = require('../../validators/users.validate');
const { getUsersCtr, postUsersCtr, patchtUsersCtr, deletetUsersCtr} = require('./users.ctr');

const route = require('express').Router();

route.get('/users-list',getUsersCtr)
route.post('/users-post', createUsersValidation , postUsersCtr)
route.patch('/users-patch/:user_id', patchUsersValidation, patchtUsersCtr)
route.delete('/users-delete/:user_id',deletetUsersCtr)

module.exports = route;