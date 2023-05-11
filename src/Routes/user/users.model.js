const queryBuilder = require('../../../config/db');
const { error } = require('../../../config/error')

async function getUsersModel() {
    const querySelectUser = `
    select
     * from 
    users
 `;


    // let data = await pool.query(querySelectUser)

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
    console.log(selectUser?.rows[0]);
    if (!selectUser?.rows?.length) {
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
     where user_id = $1
  `;

    // bir xil format topish zarur

    const findUser = await queryBuilder(querySelectUser1, user_id);
    console.log('user=>', findUser?.rows[0]);
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
    update  
     users
    set user_name = $1,
    user_nomer = $2,
    user_role = $3,
    user_login = $4,
    user_password = $5
     where user_id = $6
     returning *
  `;
        const selectUser = await queryBuilder(querySelectUser, user_name ? user_name : findUser.rows[0]?.user_name, user_nomer ? user_nomer : findUser.rows[0]?.user_nomer, user_role ? user_role : findUser.rows[0]?.user_role, user_login ? user_login : findUser.rows[0]?.user_login, user_password ? user_password : findUser.rows[0]?.user_password, user_id);

        return selectUser?.rows;
    }

}



async function deleteUsersModel(params) {
    const { user_id } = params;
    try {


        // first I find if user exist
        const querySelectUser1 = `
    select * from users
     where user_id = $1
  `;

        // bir xil format topish zarur
        const findUser = await queryBuilder(querySelectUser1, user_id);

        console.log('deleted user=>', findUser.rows[0]);

        if(!findUser?.rows?.length){
            return{
                action:true,
                status:404,
                error:error.USER_DELETE_ERROR,
                message:'Bunday foydalanuvchi topilmadi'
            }
        }else{

            const deleteQuery = `delete from users where user_id = $1`;
            let data = await queryBuilder(deleteQuery,user_id)

            return data?.rows[0]
        }   

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsersModel, postUsersModel, patchUsersModel, deleteUsersModel };