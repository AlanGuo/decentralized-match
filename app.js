const Koa = require("koa")
const koaRouter = require("koa-router")()
const router = require("./router/index")
const http = require("http")
const path = require("path")

require("./plugins/logger")

const app = new Koa()

const dev = !(app.env === "production")
// Build only in dev mode
if (dev) {
    // logger
    app.use(async function (ctx, next) {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.info(`koa:render ${ctx.method} ${ctx.url} - ${ms}ms`)
    });
}

//http路由
router(koaRouter, app)
app.use(koaRouter.routes())
// app.use(async function (ctx, next) {
//     ctx.status = 200 // koa defaults to 404 when it sees that status is unset
//     try{
//         await nuxt.render(ctx.req, ctx.res).catch((error)=>{
//             console.error(error)
//         })
//     }
//     catch (err) {
//         ctx.status = err.status || 500
//         ctx.body = err.message
//         ctx.app.emit("error", err, ctx)
//         console.error(err)
//     }
// })

//for graceful reload
// process.on('SIGINT', function() {
//    db.stop(function(err) {
//      process.exit(err ? 1 : 0);
//    });
// });

app.listen(3000, "0.0.0.0", ()=>{
  console.info( `Server listening on 0.0.0.0:3000` )
})
