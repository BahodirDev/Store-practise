const { error } = require('../../config/error');
const queryBuilder = require('../../config/db');
const { userSchema } = require('../helper/JoiValidationUsersScheme');

// async function createUsersValidation(req, res, next) {
//     const body = req.body;

//     let isExist = await queryBuilder("SELECT * FROM users where user_login = $1", body?.user_login);
//     if (isExist?.rows.length) {
//         return res.status(409).json({
//             status: 409,
//             error: error.USER_ALREADY_EXIST,
//             message: 'Bunday foydalanuvchi allaqachon mavjud',
//         });
//     }
//     if (!body?.user_name) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NAME_REQUIRED,
//             message: 'user_name kiritish majburiy',
//         });
//     } else if (!body?.user_name.trim()) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NAME_STRING,
//             message: `user_name bo'sh joy bo'lmasligi kerak !`,
//         });
//     } else if (body?.user_name.trim().length > 24) {
//         return res.status(422).json({
//             status: 422,
//             error: error.VALIDATION_ERROR_USER_NAME_LENGTH,
//             message: `user_name  uzunligi 24 ta belgi dan kichik bo'lishi kerak`,
//         });
//     } else if (!body?.user_nomer) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NOMER_REQUIRED,
//             message: `user_nomer  kiritish majburiy`,
//         })
//     } else if (typeof body?.user_nomer !== 'number') {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NOMER_NUMERIC,
//             message: `user_nomer  son kiritish kerak`,
//         })
//     } else if (body?.user_nomer?.toString().length > 20) {
//         return res.status(422).json({
//             status: 422,
//             error: error.VALIDATION_ERROR_USER_NOMER_LENGTH,
//             message: `user_nomer uzunligi 20 ta belgi dan kichik bo'lishi kerak`,
//         });
//     } else if (!body?.user_role) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NOMER_REQUIRED,
//             message: `user_role  kiritish majburiy`,
//         })
//     } else if (typeof body?.user_role !== 'number') {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_NOMER_NUMERIC,
//             message: `user_role  son kiritish kerak`,
//         })
//     } else if (!body?.user_role || (body?.user_role < 0 || body?.user_role > 9)) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_ROLE_REQUIRED,
//             message: 'user_role kiritish majburiy yoki ruhsat etilmagan user_role',
//         });
//     } if (!body?.user_login) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_LOGIN_REQUIRED,
//             message: 'user_login kiritish majburiy',
//         });
//     } if (body?.user_login?.trim().length > 19) {
//         return res.status(422).json({
//             status: 422,
//             error: error.VALIDATION_ERROR_USER_LOGIN_LENGTH,
//             message: `user_login  uzunligi 19 ta belgi dan kichik bo'lishi kerak`,
//         });
//     } if (!body?.user_login.trim()) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_LOGIN_STRING,
//             message: `user_login bo'sh joy bo'lmasligi kerak !`,
//         });
//     } if (!body?.user_password) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_PASSWORD_REQUIRED,
//             message: 'user_password kiritish majburiy',
//         });
//     } if (body?.user_password?.trim().length > 19) {
//         return res.status(422).json({
//             status: 422,
//             error: error.VALIDATION_ERROR_USER_PASSWORD_LENGTH,
//             message: `user_password  uzunligi 19 ta belgi dan kichik bo'lishi kerak`,
//         });
//     } if (!body?.user_password.trim()) {
//         return res.status(400).json({
//             status: 400,
//             error: error.VALIDATION_ERROR_USER_PASSWORD_STRING,
//             message: `user_password bo'sh joy bo'lmasligi kerak !`,
//         });
//     }
//     else {
//         next();
//     }
// }

function createUsersValidation(req, res, next) {
    console.log('nomer=>',req?.body?.user_nomer);
    const { error, value } = userSchema.validate(req.body);
    console.log('error=>',error);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error?.message,
        message: 'Validation error',
      });
    }
  
    req.body = value;
    next();
  }






async function patchUsersValidation(req, res, next) {
    const body = req.body;
    const params = req.params.user_id;

    let isExist = await queryBuilder("SELECT * FROM users where user_login = $1", body?.user_login);
    // if (!params.match('^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$')) {
    //     return res.status(403).json({
    //         status: 403,
    //         error: error.VALIDATION_ERROR_USER_ID_UUID,
    //         message: `user_id uuid bo'lishi kerak`,
    //     });
    // } else
        if (isExist?.rows.length) {
            return res.status(409).json({
                status: 409,
                error: error.USER_ALREADY_EXIST,
                message: 'Bunday foydalanuvchi allaqachon mavjud',
            });
        } else
            if (!body?.user_name) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NAME_REQUIRED,
                    message: 'user_name kiritish majburiy',
                });
            } else if (!body?.user_name.trim()) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NAME_STRING,
                    message: `user_name bo'sh joy bo'lmasligi kerak !`,
                });
            } else if (body?.user_name.trim().length > 24) {
                return res.status(422).json({
                    status: 422,
                    error: error.VALIDATION_ERROR_USER_NAME_LENGTH,
                    message: `user_name  uzunligi 24 ta belgi dan kichik bo'lishi kerak`,
                });
            } else if (!body?.user_nomer) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NOMER_REQUIRED,
                    message: `user_nomer  kiritish majburiy`,
                })
            } else if (typeof body?.user_nomer !== 'number') {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NOMER_NUMERIC,
                    message: `user_nomer  son kiritish kerak`,
                })
            } else if (body?.user_nomer?.toString().length > 20) {
                return res.status(422).json({
                    status: 422,
                    error: error.VALIDATION_ERROR_USER_NOMER_LENGTH,
                    message: `user_nomer uzunligi 20 ta belgi dan kichik bo'lishi kerak`,
                });
            } else if (!body?.user_role) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NOMER_REQUIRED,
                    message: `user_role  kiritish majburiy`,
                })
            } else if (typeof body?.user_role !== 'number') {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_NOMER_NUMERIC,
                    message: `user_role  son kiritish kerak`,
                })
            } else if (!body?.user_role || (body?.user_role < 0 || body?.user_role > 9)) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_ROLE_REQUIRED,
                    message: 'user_role kiritish majburiy yoki ruhsat etilmagan user_role',
                });
            } if (body?.user_login?.trim().length > 19) {
                return res.status(422).json({
                    status: 422,
                    error: error.VALIDATION_ERROR_USER_LOGIN_LENGTH,
                    message: `user_login  uzunligi 19 ta belgi dan kichik bo'lishi kerak`,
                });
            } if (!body?.user_password) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_PASSWORD_REQUIRED,
                    message: 'user_password kiritish majburiy',
                });
            } if (body?.user_password?.trim().length > 19) {
                return res.status(422).json({
                    status: 422,
                    error: error.VALIDATION_ERROR_USER_PASSWORD_LENGTH,
                    message: `user_password  uzunligi 19 ta belgi dan kichik bo'lishi kerak`,
                });
            } if (!body?.user_password.trim()) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_PASSWORD_STRING,
                    message: `user_password  bo'sh joy bo'lmasligi kerak !`,
                });
            } if (!body?.user_login?.trim()) {
                return res.status(400).json({
                    status: 400,
                    error: error.VALIDATION_ERROR_USER_LOGIN_STRING,
                    message: `user_login bo'sh joy bo'lmasligi kerak !`,
                });
            }
    else {
        next();
    }
}


module.exports = { createUsersValidation, patchUsersValidation };