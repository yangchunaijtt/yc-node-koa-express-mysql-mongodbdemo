const koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser= require('koa-bodyparser');
const static = require('koa-static');


const app = new koa();
const router = new Router();

// app.use(views('views',{map:{html:'ejs'}}));
app.use(views('views',{
    extension:'ejs'
}))

//配置post bodyparser的中间件
app.use(bodyParser());

// 静态文件资源
app.use(static(__dirname + '/static'));
app.use(static(__dirname + '/public'));

router.get('/',async  (ctx)=> {
    let title = 'hello word';
    await ctx.render('index',{
        title:title
    })
});
router.get('/news',async (ctx)=> {
    console.log(ctx.query);
    ctx.body = 'news?'+ctx.querystring;
})
router.get('/newlogin/:id',async (ctx) => {
    //
    console.log(ctx.params);
    ctx.body = 'newlogin/'+JSON.stringify(ctx.params);
})
router.get('/newsres/:id/:name',async (ctx) => {
    console.log(ctx.params)
    ctx.body = 'newlogin/'+JSON.stringify(ctx.params);
});

router.get('/login',async  (ctx)=> {
    await ctx.render('form',{});
});

router.get('/static',async ctx => {
    await ctx.render('static');
})

router.post('/tologin',(ctx) => {
    ctx.body = ctx.request.body
    console.log(ctx.request.body);
    ctx.body =  JSON.stringify(ctx.body);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001,()=> {
    console.log('app server in 3001')
});
