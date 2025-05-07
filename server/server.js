const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
//path.resolve()
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2bfr##@h0m",
  database: "product_ratingsdb",
});

app.post("/add_product", (req, res) => {
  const sql =
    "INSERT INTO product (`name`,`description`,`category`,`price`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Product added successfully" });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
