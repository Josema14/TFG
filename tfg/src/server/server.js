const express = require("express");
const app = express();
const cors = require("cors");
//Importamos express y cors

//Cors es 

require("dotenv").config({ path: "./config.env" });

//Leemos la configuración 
const port = process.env.PORT || 5000;
app.use(cors({ origin: true, credentials: true  }));
app.use(express.json());
app.use(require("../routes/BD/record"));
// get driver connection
const dbo = require("./db/conn.js");
 
//Iniciamos el servidor de BD
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});