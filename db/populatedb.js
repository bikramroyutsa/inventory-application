import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Client } = pg;
const SQL = `
CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    price NUMERIC,
    category VARCHAR(255),
    img_link TEXT,
    stock INTEGER
);

INSERT INTO products (name, price, category, img_link, stock) VALUES
    ('Female Titan figure', 56.99, 'Attack On Titan', 'https://m.media-amazon.com/images/I/51lDzS4Mg5L._AC_SL1050_.jpg', 100),
    ('Yoichi Isagi Awakening ver Bandai Spirits Figure', 40, 'Blue Lock', 'https://m.media-amazon.com/images/I/61N3cXyrMTL._AC_SL1500_.jpg', 200),
    ('L Death Note Figure', 49.99, 'Death Note', 'https://m.media-amazon.com/images/I/61bSg4eVTDL._AC_SL1280_.jpg', 75);

CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cat_name VARCHAR(255)
);
INSERT INTO categories (cat_name) VALUES
  ('Death Note'), ('Attack On Titan'), ('Blue Lock');
`;
async function main() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING_LOCAL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}
main();
