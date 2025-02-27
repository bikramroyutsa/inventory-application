import pool from "./pool.js";
const query = (() => {
  async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  }
  async function addNewCategory(obj, imageLink) {
    await pool.query(
      `
      INSERT INTO categories(cat_name, cat_img) VALUES ($1, $2)
      `,
      [obj.name, imageLink]
    );
  }
  async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  }
  async function addNewProduct(obj, img_link) {
    await pool.query(
      `
      INSERT INTO products(name, price, category, stock, img_link)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [obj.name, obj.price, obj.category, obj.stock, img_link]
    );
  }
  async function getProductsByCategory(category) {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE category = ($1)`,
      [category]
    );
    return rows;
  }
  async function deleteProduct(id) {
    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
  }
  async function getProductByID(id) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = $1`, [
      id,
    ]);
    return rows;
  }
  async function editProduct(obj, img_link) {
    let optional = ``;
    let sql = `UPDATE products SET name = '${obj.name}', 
                  price =${obj.price}, category = '${obj.category}', 
                  stock = ${obj.stock} WHERE id = ${obj.id}`;

    if (img_link) {
      sql = `UPDATE products SET name = '${obj.name}', 
                price =${obj.price}, category = '${obj.category}', 
                stock = ${obj.stock}, img_link = '${img_link}' WHERE id = ${obj.id}`;
    }

    await pool.query(sql);
  }
  return {
    getAllProducts,
    addNewProduct,
    getAllCategories,
    addNewCategory,
    getProductsByCategory,
    deleteProduct,
    getProductByID,
    editProduct,
  };
})();
export default query;
