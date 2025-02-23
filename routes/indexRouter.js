import { Router } from "express";
import { getAllCategories } from "../db/query.js";
export const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  res.render("index");
});
