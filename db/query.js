import pool from "./pool.js";
const query = (() => {
  async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  }
  async function addNewCategory(name) {
    await pool.query(
      `
      INSERT INTO categories(cat_name) VALUES ($1)
      `,
      [name]
    );
  }
  async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  }
  async function addNewProduct(name, price, category, stock, img_link) {
    await pool.query(
      `
      INSERT INTO products(name, price, category, stock, img_link)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [name, price, category, stock, img_link]
    );
  }
  async function getProductsByCategory(category) {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE category = ($1)`,
      [category]
    );
    return rows;
  }
  return {
    getAllProducts,
    addNewProduct,
    getAllCategories,
    addNewCategory,
    getProductsByCategory,
  };
})();
export default query;
