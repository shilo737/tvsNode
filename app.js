const express = require("express")
const path = require("path")
const http = require("http");
require("./db/mongoConnect")
const { routesInit } = require("./routes/configRouters");



const app = express()
app.use(express.json())

routesInit(app)

const server = http.createServer(app)

server.listen(3008)