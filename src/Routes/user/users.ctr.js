const { getUsersModel, postUsersModel, patchUsersModel, deleteUsersModel } = require("./users.model");

async function getUsersCtr(req, res) {
    const model = await getUsersModel();
    res.status(201).json(model);
}


async function postUsersCtr(req, res) {
    const model = await postUsersModel(req.body);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(201).json({
            status: 201,
            message: 'Foydalanuvchi yaratildi!',
            data: model,
        });
    }
}

async function patchtUsersCtr(req, res) {
    const model = await patchUsersModel(req.body, req.params);
    console.log(model);
    res.send('patch dan salom');
}

async function deletetUsersCtr(req, res) {
    const model = await deleteUsersModel(req.params);
    if (model?.action) {
        delete model.action;
        res.status(model.status).json(model);
    }else{
        console.log(model);
        res.send('delete dan salom');
    }
}



module.exports = {
    getUsersCtr,
    postUsersCtr,
    patchtUsersCtr,
    deletetUsersCtr
};