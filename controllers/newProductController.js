import { v2 as cloudinary } from "cloudinary";
import query from "../db/query.js";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function newProductController(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { name, price, category, stock } = req.body;
  const customPublicId = `${name}-${Date.now()}`;
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "image",
        folder: "inventory-application",
        public_id: customPublicId,
        use_filename: true,
      },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ error: "Error uploading to Cloudinary" });
        }

        await query.addNewProduct(
          name,
          price,
          category,
          stock,
          result.secure_url
        );
        // res.json({ public_id: result.public_id, url: result.secure_url });
        res.redirect("/products");
      }
    )
    .end(req.file.buffer);
}
