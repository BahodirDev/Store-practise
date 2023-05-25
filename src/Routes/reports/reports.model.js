const queryBuilder = require("../../../config/db")
const { error } = require("../../../config/error")

// for posting products
async function postReportsModelForProductPost(body) {
	try {
		const {
			store,
			goods_name,
			goods_code,
			client,
			isEnter,
			user_info,
			reports_box_count,
			reports_count,
			reports_count_cost,
			percent,
			percent_amount,
			reports_total_cost,
		} = body

		const querySelectReports = `
        insert into
        reports(store,goods_name,goods_code,client,isEnter,user_info,reports_box_count,reports_count,reports_count_cost,percent,percent_amount, reports_total_cost)
        values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        returning *
    `
		const insertReports = await queryBuilder(
			querySelectReports,
			store,
			goods_name,
			goods_code,
			client,
			isEnter,
			user_info ? user_info : "username ",
			reports_box_count,
			reports_count,
			reports_count_cost,
			percent,
			percent_amount,
			reports_total_cost
		)
		if (!insertReports?.rows.length) {
			return {
				action: true,
				status: 500,
				error: error.UNKOWN_SERVER_ERROR,
				message: "Reports da xatolik",
			}
		} else {
			return insertReports?.rows[0]
		}
	} catch (error) {
		console.log(error)
	}
}


async function saleReportsModelForProducts(body) {
	try {
		const { products } = body

		const missingOrInsufficientProducts = []
		const insertedReports = []

		for (const item of products) {
			const { product_id, count, price } = item
			const checkIfExist = ` SELECT
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
        JOIN currency c ON p.percent_id = c.currency_id
        where p.products_id = $1
      `;
			const existProduct = await queryBuilder(checkIfExist, product_id)
			console.log("project=>", existProduct.rows)
			if (
				!existProduct?.rows.length ||
				parseFloat(existProduct.rows[0].products_count) < count
			) {
				missingOrInsufficientProducts.push({
					name: existProduct.rows[0].goods_name,
					count: existProduct.rows[0].products_count,
				})
			} else {
                let totalCost = price * count;
				const insertQuery = `
			    INSERT INTO reports (
			      store,
			      goods_name,
			      goods_code,
			      client,
			      isEnter,
			      user_info,
			      reports_box_count,
			      reports_count,
			      reports_count_cost,
			      percent,
			      percent_amount,
			      reports_total_cost
			    )
			    VALUES (
			      $1,
			      $2,
			      $3,
			      $4,
			      $5,
			      $6,
			      $7,
			      $8,
			      $9,
			      $10,
			      $11
			      $12
			    )
			    RETURNING *
			  `

				const values = [
					existProduct.rows[0].store_id?.store_name,
					existProduct.rows[0].goods_id?.goods_name,
					existProduct.rows[0].goods_id?.goods_code,
					existProduct.rows[0].deliver_id?.deliver_name,
					false,
					existProduct.rows[0].products_box_count,
					existProduct.rows[0].products_count,
					existProduct.rows[0].products_count_cost,
					existProduct.rows[0].percent_id?.percent_name,
					existProduct.rows[0].percent_id?.percent_amount,
					totalCost
				]

				const insertedReport = await queryBuilder(insertQuery, ...values)
				insertedReports.push(insertedReport.rows[0])
			}
		}

		if (missingOrInsufficientProducts.length) {
			return {
				action: true,
				error: error.AUTHORIZATION_ERROR,
				status: 403,
				message: "Mahsulot kam",
				data: missingOrInsufficientProducts,
			}
		}

		return insertedReports;
	} catch (error) {
		console.log(error)
	}
}



module.exports ={postReportsModelForProductPost, saleReportsModelForProducts};