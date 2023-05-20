const { getProductsModel, postProductsModel, patchProductsModel, deleteProductsModel, saleProductsModel} = require("./products.model");


async function getProductCtr(req, res) {
    const model = await getProductsModel();
    res.status(201).json(model);
}
async function postProductCtr(req, res) {
    const model = await postProductsModel(req?.body);
    if (model.action) {
        delete model.action;
        return res.status(model.status).json(model);
    } else {
        return res.json(model)
    }
}
async function patchProductCtr(req, res) {
    const model = await patchProductsModel(req?.body, req?.params);
    if (model.action) {
        delete model.action;
        return res.status(model.status).json(model);
    } else {
        return res.json(model)
    }
}
async function deleteProductCtr(req, res) {
    const model = await deleteProductsModel(req?.params);
    if (model.action) {
        delete model.action
        res.status(model.status).json(model)
    } else {
        res.json({ message: "Muvaffaqiyatli o`chirildi" })
        res.status(204).end()
    }
}



// logic controller
async function saleProductCtr(req, res) {
    const model = await saleProductsModel(req?.body);
    if (model.action) {
        delete model.action
        res.status(model.status).json(model)
    } else {
        res.json({ message: "Muvaffaqiyatli sotildi (massi qaytarishimiz mumkin)" })
        res.status(204).end()
    }
}

module.exports = { getProductCtr, postProductCtr, patchProductCtr, deleteProductCtr, saleProductCtr};