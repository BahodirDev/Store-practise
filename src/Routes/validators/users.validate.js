const { error } = require('../../../config/error');

function createUsersValidation(req, res, next) {
    const body = req.body;

    if (!body?.user_name) {
        res.status(400).json({
            status: 400,
            error: error.VALIDATION_ERROR_USER_NAME_REQUIRED,
            message: 'user_name kiritish majburiy',
        });
    } else if (!body?.user_name.trim()) {
        res.status(400).json({
            status: 400,
            error: error.VALIDATION_ERROR_USER_NAME_STRING,
            message: `user_name bo'sh joy bo'lmasligi kerak !`,
        });
    } else if (body?.user_name.length > 24) {
        res.status(422).json({
            status: 422,
            error: error.VALIDATION_ERROR_USER_NAME_LENGTH,
            message: `user_name  uzunligi 24 ta belgi dan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}


module.exports = {createUsersValidation};