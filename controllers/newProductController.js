import query from "../db/query.js";
import { insert } from "../tools/uploader.js";

export async function newProductController(req, res) {
  const { name, price, category, stock } = req.body;
  const obj = { name, price, category, stock };
  insert(req, res, query.addNewProduct, obj, "products");
}
