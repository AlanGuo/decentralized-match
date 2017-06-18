if (process.SERVER_BUILD) {
    const path = require("path")
    const log4js = require("log4js")
    const fs = require("fs")

    let isDev = process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development" 
    const level = isDev? "DEBUG":"INFO"
    //let logPath = isDev ? path.resolve(__dirname, "../logs") : "/var/log/viabtc_exchange_cn_web"
    //logPath += "/viabtc_exchange_cn_web.log"
    
    const logConfig = {
        appenders : [
            {
                "type" : "console", 
                "category" : "console"
            }
        ],
        replaceConsole : true
    }
    let logger = null
    try{
        log4js.configure(logConfig)
        logger = log4js.getLogger("viabtc_exchange_cn_web")
    }
    catch(e){
        logger?logger.log(e):console.log(e)
    }
    module.exports = logger
}
else{
    module.exports = console
}