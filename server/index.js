require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const authMiddleware = require('./auth-middleware');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const app = express();

app.use(jsonMiddleware);
app.use(staticMiddleware);

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

app.post('/api/addToCart', (req, res, next) => {
  const token = req.get('X-Access-Token');
  if (!token) {
    const cartSql = `
      insert into "cart" ("purchased")
        values ('false')
        returning "cartId"
  `;
    db.query(cartSql)
      .then(result => {
        const cartId = result.rows[0];
        const payload = cartId;
        const cartItem = req.body;
        const { productId, quantity, size } = cartItem;
        const sql = `
        insert into "cartItems" ("cartId", "productId", "quantity", "size")
        values ($1, $2, $3, $4)
        returning *
      `;
        const params = [payload.cartId, productId, quantity, size];
        db.query(sql, params)
          .then(result => {
            res.json({ token, cartItem: result.rows[0] });
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const cartId = payload.cartId;
    const cartItem = req.body;
    const { productId, quantity, size } = cartItem;
    const sql = `
      insert into "cartItems" ("cartId", "productId", "quantity", "size")
      values ($1, $2, $3, $4)
      on conflict ("cartId", "productId", "size")
      do update
      set "quantity" = "cartItems"."quantity" + "excluded"."quantity"
      returning *
    `;
    const params = [cartId, productId, quantity, size];
    db.query(sql, params)
      .then(result => {
        res.json({ token, cartItem: result.rows[0] });
      })
      .catch(err => next(err));
  }
});

app.get('/api/cart', (req, res, next) => {
  const token = req.get('X-Access-Token');
  if (!token) {
    return res.json([]);
  }
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const cartId = payload.cartId;
  const sql = `
  select "productId",
         "name",
         "price",
         "size",
         "quantity",
         "imageUrl"
    from "cart"
    join "cartItems" using("cartId")
    join "shoes" using("productId")
   where "cartId" = $1
`;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      const cartItems = result.rows;
      res.status(200).json(cartItems);
    })
    .catch(err => next(err));
});

app.use(authMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
