const functions = require('firebase-functions');
const express = require('express');
const { json } = require('body-parser');

const api = () => {
  const router = express.Router()

  router.use(json());

  router.post('/create', (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send(
      JSON.stringify(
        {
          "title": "Template Options",
          "type": "object",
          "properties": {
            "Suburb": {
              "type": "string",
              "enum": [
                "Sydney 2000",
                "Melbourne 3000",
                "Brisbane 4000"
              ]
            }
          },
          "required": [
            "Suburb"
          ],
          "dependencies": {
            "Suburb": {
              "oneOf": [
                {
                  "properties": {
                    "Suburb": {
                      "enum": [ "Melbourne 3000" ]
                    },
                    "Select an Agent": {
                      "type": "number",
                      "enum": [3001, 3002],
                      "enumNames": [ "Liam O’Boyle", "Andrew Carr" ]
                    }
                  },
                  "required": [ "Suburb", "Select an Agent" ]
                },
                {
                  "properties": {
                    "Suburb": {
                      "enum": [ "Sydney 2000" ]
                    },
                    "Select an Agent": {
                      "type": "number",
                      "enum": [2001, 2002],
                      "enumNames": [ "Matt Gay", "Adrian Gimenz" ]
                    }
                  },
                  "required": [ "Suburb", "Select an Agent" ]
                },
                {
                  "properties": {
                    "Suburb": {
                      "enum": [ "Brisbane 4000" ]
                    },
                    "Select an Agent": {
                      "type": "number",
                      "enum": [4001],
                      "enumNames": [ "Jordan Tormey" ]
                    }
                  },
                  "required": [ "Suburb", "Select an Agent" ]
                }
              ]
            }
          }
        }
      )
    );
  });

  return router;
};

const app = express();
app.use('/api', api());

exports.app = functions.https.onRequest(app);
