const { createToken } = require("../../../config/jwt");
const { authUserModel } = require("./auth.model");

async function getAuthCtr(req, res) {
    const model = await authUserModel(req.body);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(200).json({
            status: 200,
            message: 'Siz tizimga kirdingiz',
            data: {
                user:{name:model.user_name,role:model.user_role,nomer:model.user_nomer},
                token: await createToken(model?.user_id)
            },
        });
    }
}

module.exports = {getAuthCtr};