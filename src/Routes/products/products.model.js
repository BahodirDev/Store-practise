// getProductsModel
const { error } = require('../../../config/error');
const queryBuilder  = require("../../../config/db");


async function getProductsModel() {
    try {
        // let p ={};
        // p.name = "salom";
        // goods_id as {}
        const querySelectProducts = `
        SELECT
        p.products_id,
        json_build_object('goods_id', g.goods_id, 'goods_name', g.goods_name, 'goods_code', g.goods_code, 'goods_createdat', g.goods_createdat) AS goods_id,
        json_build_object('deliver_id', d.deliver_id, 'deliver_name', d.deliver_name, 'deliver_nomer', d.deliver_nomer, 'deliver_place', d.deliver_place, 'deliver_createdat', d.deliver_createdat) AS deliver_id,
        json_build_object('store_id', s.store_id, 'store_name', s.store_name, 'store_createdat', s.store_createdat) AS store_id,
        p.products_box_count,
        p.products_count,
        p.products_count_cost,
        json_build_object('percent_id', c.currency_id, 'currency_name', c.currency_name, 'currency_amount', c.currency_amount, 'minper', c.minper, 'maxper', c.maxper) AS percent_id,
        p.products_createdat
      FROM
        products p
        JOIN goods g ON p.goods_id = g.goods_id
        JOIN deliver d ON p.deliver_id = d.deliver_id
        JOIN store s ON p.store_id = s.store_id
        JOIN currency c ON p.percent_id = c.currency_id;
    `;
        const selectProducts = await queryBuilder(querySelectProducts);
        return selectProducts.rows;
    } catch (error) {
        console.log(error);
    }

}
async function postProductsModel(body) {
    try {
        console.log('body=>',body);
        const { goods_id, deliver_id, store_id, percent_id, products_box_count, products_count, products_count_cost } = body;

        let checkIfExist = `
            select 
            * from products
            where goods_id = $1 and
            store_id = $2
        `;
        let existProduct = await queryBuilder(checkIfExist, goods_id, store_id);
        if (!existProduct?.rows.length) {
            let insertQuery = `
        insert into     
        products(goods_id,deliver_id,store_id,percent_id,products_box_count,products_count,products_count_cost)
        values($1,$2,$3,$4,$5,$6,$7)
        returning *
        `;
            let result = await queryBuilder(insertQuery, goods_id, deliver_id, store_id, percent_id, products_box_count, products_count, products_count_cost);
            if (!result?.rows.length) {
                return {
                    action: true,
                    error: error.UNKOWN_SERVER_ERROR,
                    status: 500,
                    message: "Product qo`shishda xatolik"
                }
            } else {
                return result?.rows[0]

            }
        } else {
            let insertQuery = `
            update 
            products
            set percent_id = $1,
            products_box_count = $2,
            products_count = $3,
            products_count_cost = $4
            where goods_id = $5 and
            store_id = $6
            returning *
            `;

            let amountOfProductCount = parseFloat(products_count) + parseFloat(existProduct?.rows[0].products_count);
            let amountOfBoxCount = parseFloat(products_box_count) + parseFloat(existProduct?.rows[0].products_box_count);

            let result = await queryBuilder(insertQuery, percent_id ? percent_id : existProduct.rows[0].percent_id, products_box_count ? amountOfBoxCount : parseFloat(existProduct.rows[0].products_box_count), products_count ? amountOfProductCount : parseFloat(existProduct.rows[0]?.products_count), products_count_cost ? products_count_cost : parseFloat(existProduct.rows[0]?.products_count_cost), goods_id, store_id);
            if (!result.rows.length) {
                return {
                    action: true,
                    error: error.UNKOWN_SERVER_ERROR,
                    status: 500,
                    message: "Product qo`shishda xatolik"
                }
            } else {
                return result?.rows[0]
            }
        }

    } catch (error) {
        console.log(error);
    }

}
async function patchProductsModel(body, params) {
    try {
        const { goods_id, deliver_id, store_id, percent_id, products_box_count, products_count, products_count_cost } = body;
        const { product_id } = params;
        let checkIfExist = `
        select * from products where products_id = $1
    `;
        let result = await queryBuilder(checkIfExist, product_id);
        if (!result?.rows.length) {
            return {
                action: true,
                error: error.PRODUCT_NOT_FOUND,
                status: 404,
                message: "Mahsulot topilmadi"
            }
        } else {

            let updateQuery = `
            update 
            products
            set goods_id = $1,
            store_id = $2,
            deliver_id = $3,
            percent_id = $4,
            products_box_count = $5,
            products_count = $6,
            products_count_cost = $7
            where products_id = $8
            returning *
            `;

            let amountOfProductCount = parseFloat(products_count);
            let amountOfProductCount2 = parseFloat(result?.rows[0].products_count);
            let amountOfBoxCount = parseFloat(products_box_count);
            let amountOfBoxCount2 = parseFloat(result?.rows[0].products_box_count);


            let updatedResult = await queryBuilder(updateQuery, goods_id ? goods_id : result?.rows[0].goods_id, store_id ? store_id : result?.rows[0].store_id, deliver_id ? deliver_id : result?.rows[0].deliver_id, percent_id ? percent_id : existProduct.rows[0].percent_id, amountOfBoxCount ? amountOfBoxCount : amountOfBoxCount2, amountOfProductCount ? amountOfProductCount : amountOfProductCount2, products_count_cost ? products_count_cost : parseFloat(existProduct.rows[0]?.products_count_cost), product_id);

            if (!updatedResult?.rows.length) {
                return {
                    action: true,
                    error: error.UNKOWN_SERVER_ERROR,
                    status: 500,
                    message: "Mahsulot o`zgartirishda xatolik"
                }
            } else {

                return updatedResult?.rows[0]
            }


        }

    } catch (error) {
        console.log(error);
    }

}
async function deleteProductsModel(params) {
    try {
        const { product_id } = params;
        let findIfExistQuery = `
            select * from products
            where products_id = $1
        `;
        let result = await queryBuilder(findIfExistQuery, product_id);
        if (!result?.rows.length) {
            return {
                action: true,
                error: error.PRODUCT_NOT_FOUND,
                status: 404,
                message: "Product topilmadi"
            }
        } else {
            let deleteQuery = `
            delete from products
            where products_id = $1 
            returning *
            `;
            const deletedProduct = await queryBuilder(deleteQuery, product_id);
            return deletedProduct?.rows[0]
        }

    } catch (error) {
        console.log(error);
    }
}

// logic model
async function saleProductsModel(body) {
    try {
        const { products } = body

        const missingOrInsufficientProducts = [];
        let resultOfLogic;

        for (const item of products) {
            const { product_id, count } = item;

            const checkIfExist = `
            SELECT
        p.products_id,
        p.goods_id,
        g.*,
        p.deliver_id,
        d.*,
        p.store_id,
        s.*,
        p.products_box_count,
        p.products_count,
        p.products_count_cost,
        p.percent_id,
        c.*,
        p.products_createdat
      FROM
        products p
        JOIN goods g ON p.goods_id = g.goods_id
        JOIN deliver d ON p.deliver_id = d.deliver_id
        JOIN store s ON p.store_id = s.store_id
        JOIN currency c ON p.percent_id = c.currency_id
        where products_id = $1
          `;
            const existProduct = await queryBuilder(checkIfExist, product_id);

            if (!existProduct?.rows.length) {
                missingOrInsufficientProducts.push({ name: "Topilmadi", count: "Topilmadi" });

            } else if (!existProduct?.rows.length || parseFloat(existProduct.rows[0].products_count) < count) {
                missingOrInsufficientProducts.push({ name: existProduct.rows[0].goods_name, count: existProduct.rows[0].products_count });
            }
        }
        if (missingOrInsufficientProducts.length) {
            return {
                action: true,
                error: error.AUTHORIZATION_ERROR,
                status: 403,
                message: "Mahsulot kam",
                data: missingOrInsufficientProducts
            }
        } else {

            for (const item of products) {
                const { product_id, count } = item;
                let findExistProduct = `
                select * from products
                where products_id = $1
                `;

                let existProduct = await queryBuilder(findExistProduct, product_id)

                let updateQuery = `
                update 
                products
               set products_box_count = $1,
                products_count = $2
                where 
                products_id = $3
                returning *
                `;

                let amountOfProductCount = parseFloat(existProduct?.rows[0].products_count) - parseFloat(count);
                let inEachBox = parseFloat(existProduct?.rows[0].products_count) / parseFloat(existProduct?.rows[0].products_box_count)
                let amountOfBoxCount = parseFloat(amountOfProductCount) / inEachBox;
                console.log('product_id=>', product_id);
                let result = await queryBuilder(updateQuery, amountOfBoxCount, amountOfProductCount, product_id);
                console.log('result=>', result.rows);
            }
            return [];

        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductsModel, postProductsModel, patchProductsModel, deleteProductsModel, saleProductsModel };