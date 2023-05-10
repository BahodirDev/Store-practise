const queryBuilder = require('../../../config/db');
const { error } = require('../../../config/error')

async function getUsersModel() {
    const querySelectUser = `
    select
     * from 
    users
 `;

    const selectUser = await queryBuilder(querySelectUser);
    return selectUser.rows;
}

async function postUsersModel(body) {
    const { user_name, user_nomer, user_login, user_password, user_role } = body;
    const querySelectUser = `
   insert 
   into 
    users
    (user_name,user_nomer,user_role,user_login,user_password)
    values($1,$2,$3,$4,$5)
    returning *
 `;

    const selectUser = await queryBuilder(querySelectUser, user_name, user_nomer, user_role, user_login, user_password);
    console.log(selectUser.rows);
    if (!selectUser.rows.length) {
        return {
            action: true,
            status: 500,
            error: error.USER_POST_ERROR,
            message: "User qo`shishda xatolik"
        }
    } else {
        return selectUser.rows[0];
    }
}
// patch ishlagani yo'q
async function patchUsersModel(body, params) {
    const { user_id } = params;
    const { user_name, user_nomer, user_login, user_password, user_role } = body;

    // first I find if user exist
    const querySelectUser1 = `
    select * from users
     where id = ${user_id}
  `;

    // bir xil format topish zarur

    const findUser = await queryBuilder(querySelectUser1, user_id);
    if (!findUser.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USER_NOT_FOUND,
            message: `${user_id} id dagi foydalanuvchi topilmadi`
        }
    } else {
        // login va passwordni tekshirish kerak
        const querySelectUser = `
    uodate  
     users
    set user_name = $1,
    user_nomer =$2,
    user_role = $3,
    user_login = $4,
    user_password = $5, 
     values($1,$2,$3,$4,$5)
     where id = ${user_id}
     returning *
  `;
        const selectUser = await queryBuilder(querySelectUser, user_name, user_nomer, user_role, user_login, user_password);

        return selectUser.rows;
    }

}


module.exports = { getUsersModel, postUsersModel };