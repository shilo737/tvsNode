const indexR = require("./index")
const usersR = require("./users")
const tvsR = require("./tvs")



exports.routesInit = (app) => {
app.use("/",indexR)
app.use("/users",usersR)
app.use("/tvs",tvsR)
}