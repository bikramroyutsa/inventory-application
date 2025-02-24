import express from "express";
import { indexRouter } from "./routes/indexRouter.js";
import { productRouters} from "./routes/productsRouter.js";
import path from "path";
import url from "url";

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productRouters);

app.listen(3000, () => {
  console.log("listening");
});
