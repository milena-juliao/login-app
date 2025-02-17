const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes.js");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
