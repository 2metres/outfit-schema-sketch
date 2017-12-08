const functions = require('firebase-functions');
const express = require('express');
const { json } = require('body-parser');

const api = () => {
  const router = express.Router()

  router.use(json());

  router.post('/create', (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(JSON.stringify(req.body, null, '  '));
  });

  return router;
};

const app = express();
app.use('/api', api());

exports.app = functions.https.onRequest(app);
