import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Client } = pg;
const SQL = `
CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE,
    price NUMERIC,
    category VARCHAR(255),
    img_link TEXT,
    stock INTEGER
);

CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cat_name VARCHAR(255) UNIQUE,
    cat_img TEXT
);
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
