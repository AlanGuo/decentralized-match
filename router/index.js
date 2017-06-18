const exchange =require("../services/exchange")

module.exports = function(routers, app) {
    routers.get("/api/exchange", exchange)
}