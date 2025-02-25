import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export async function insert(req, res, callback, obj, redir) {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }
  const customPublicId = `${obj.name}-${Date.now()}`;
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "image",
        public_id: customPublicId,
        folder: "inventory-application",
        use_filename: true,
      },
      async (error, result) => {
        if (error) {
          console.log("Error");
          res.status(500).json({ error: "Error uploading to cloudinary" });
        }
        const imageLink = result.secure_url;
        await callback(obj, imageLink);
        res.redirect(`/${redir}`);
      }
    )
    .end(req.file.buffer);
}
