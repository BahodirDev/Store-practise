const { postReportsModelForProductPost, saleReportsModelForProducts } = require("./reports.model");

async function postReportsCtrForProductPost(req, res) {
    const model = await postReportsModelForProductPost(req?.body);
    if (model.action) {
        return res.status(model.status).json(model);
    } else {
        return res.status(201).json(model);
    }
}

async function saleReportsCtrForProductPost(req, res) {
    const model = await saleReportsModelForProducts(req?.body);
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model);
    } else {
        res.json({ message: " reportsga Muvaffaqiyatli qo`shildi" })
        // Respond with a 204 status code to indicate successful deletion
        res.status(204).end();
    }
}

module.exports = {postReportsCtrForProductPost,saleReportsCtrForProductPost};