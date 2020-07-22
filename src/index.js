import 'dotenv/config';
import express, { query } from 'express';
import cors from 'cors';
const bodyParser = require('body-parser');
const connection = require('../database/db');
const mysql = require('mysql');
const convertFormat = require('./helpers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});

app.get('/', (req, res) => {
  res.send('Root of domain reached!');
});

// QUESTIONS LIST SERVICE
app.get('/qa/:id', (req, res) => {
  // res.send('Example route of domain reached!' + req.params.id);
  let queryStr = `select * from questions join answers on questions.question_id=answers.question_id where questions.product_id=${mysql.escape(
    req.params.id
  )}`;
  let options = { sql: queryStr, nestTables: true };
  connection.query(options, (err, results, fields) => {
    if (err) {
      console.log(err);
    }

    res.status(200).json(convertFormat(results));
  });
});

// ANSWERS LIST SERVICE
app.get('/qa/:id/answers', (req, res) => {
  res.status(200).send('success');
});
