import { connection } from '../config/db.config.js'

class DashboardServices {
  static getMostBeneficialItems(limit = 5) {
    const sql = `
      SELECT 
          item.id,
          item.sku,
          item.item_name,
          SUM(sale.price * sale.sold_quantity) AS total_revenue
      FROM 
          item
      JOIN 
          sale ON item.id = sale.item_id
      GROUP BY 
          item.id, item.sku, item.item_name
      ORDER BY 
          total_revenue DESC
      LIMIT ?;
    `
    return new Promise((resolve, reject) => {
      connection.query(sql, [limit], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static getFrequentlyStockedItems() {
    const sql = `
      SELECT 
          item.id,
          item.sku,
          item.item_name,
          COUNT(stock.id) AS stock_count
      FROM 
          item
      JOIN 
          stock ON item.id = stock.item_id
      GROUP BY 
          item.id, item.sku, item.item_name
      ORDER BY 
          stock_count DESC;
    `
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static getFrequentlySoldItems() {
    const sql = `
      SELECT 
          item.id,
          item.sku,
          item.item_name,
          COUNT(sale.id) AS sale_count
      FROM 
          item
      JOIN 
          sale ON item.id = sale.item_id
      GROUP BY 
          item.id, item.sku, item.item_name
      ORDER BY 
          sale_count DESC;
    `
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static getMostStockedCategories(limit = 5) {
    const sql = `
      SELECT 
          category.id,
          category.category_name,
          SUM(stock.received_quantity) AS total_stocked_quantity
      FROM 
          category
      JOIN 
          item ON category.id = item.category_id
      JOIN 
          stock ON item.id = stock.item_id
      GROUP BY 
          category.id, category.category_name
      ORDER BY 
          total_stocked_quantity DESC
      LIMIT ?;
    `
    return new Promise((resolve, reject) => {
      connection.query(sql, [limit], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static getMostSoldCategories(limit = 5) {
    const sql = `
      SELECT 
          category.id,
          category.category_name,
          SUM(sale.sold_quantity) AS total_sold_quantity
      FROM 
          category
      JOIN 
          item ON category.id = item.category_id
      JOIN 
          sale ON item.id = sale.item_id
      GROUP BY 
          category.id, category.category_name
      ORDER BY 
          total_sold_quantity DESC
      LIMIT ?;
    `
    return new Promise((resolve, reject) => {
      connection.query(sql, [limit], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}

export default DashboardServices
