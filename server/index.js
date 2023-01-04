require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();

const ClientError = require('./client-error');

const pg = require('pg');
const app = express();

app.use(jsonMiddleware);
app.use(staticMiddleware);
app.use(errorMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/shoes', (req, res, next) => {
  const sql = `
  select "productId",
          "sku",
          "name",
          "price",
          "imageUrl",
          "brand"
    from "shoes"
  `;
  db.query(sql)
    .then(result => {
      const shoes = result.rows;
      res.status(200).json(shoes);
    })
    .catch(err => next(err));
});

app.get('/api/shoes/:productId', (req, res, next) => {
  const sql = `
    select "productId",
          "sku",
          "name",
          "price",
          "imageUrl",
          "brand",
          array_agg("size") as sizes
    from "shoes"
    join "sizes" using ("productId")
    where "productId" = $1
    group by "productId"
  `;

  const params = [Number(req.params.productId)];

  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError(404, 'Product is not found');
      }
      res.status(200).json(product);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
