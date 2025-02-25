import query from "../db/query.js";
import { insert } from "../tools/uploader.js";

export async function newCategoryController(req, res) {
  const { cat_name } = req.body;
  const obj = { name: cat_name };
  insert(req, res, query.addNewCategory, obj, "");
}
