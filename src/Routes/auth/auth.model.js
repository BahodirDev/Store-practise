const queryBuilder = require("../../../config/db");
const { error } = require("../../../config/error");


async function authUserModel(body) {
    try {

        const { user_login, user_password } = body;

        const querySelectUser = `
        select
         * from 
        users
        where 
        user_login = $1
     `;


        const selectUser = await queryBuilder(querySelectUser, user_login);
        if (!selectUser?.rows.length) {
            return {
                action: true,
                error: error.USERS_NOT_FOUND,
                status: 404,
                message: "Foydalanuvchi topilmadi"
            }
        } else {
            if (selectUser?.rows[0].user_password != user_password) {
                return {
                    action: true,
                    error: error.USERS_PASSWORD_ERROR,
                    status: 400,
                    message: "Foydalanuvchi password xatolik"
                }
            } else {
                return selectUser.rows[0];
            }
        }

    } catch (error) {
        console.log(error);
    }

}


module.exports = { authUserModel };