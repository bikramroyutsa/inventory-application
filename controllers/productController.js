import query from "../db/query.js";
import { insert } from "../tools/uploader.js";

export async function newProductController(req, res) {
  const { name, price, category, stock } = req.body;
  const obj = { name, price, category, stock };
  insert(req, res, query.addNewProduct, obj, "products");
}

export async function editProductController(req, res) {
  const { name, price, category, stock, id } = req.body;
  const obj = { name, price, category, stock, id };
  if (req.file) {
    insert(req, res, query.editProduct, obj, "products");
    // console.log("hi bro")
  } else {
    await query.editProduct(obj);
    res.redirect("/products");
  }
}
