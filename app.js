const express = require("express");
const app = express();
const PORT = process.env.PORT || 8877;
const arq = require("./items.json");
const cors = require('cors');

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:4200'
];

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };

app.options('*', cors(corsOptions));

app.get("/status", cors(corsOptions), (req, res) => {
    res.json({
        msg: "ok",
    });
});

app.get("/", cors(corsOptions), (req, res) => {
    const id = req.query.id;

    if (typeof id === "undefined") {
        res.json(arq);
    }    

});

app.listen(PORT, () => {
    console.log("escutando porta : " + PORT);
});

