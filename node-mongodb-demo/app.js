const http = require("http");
const app = require('./module/routes');

const { MongoClient } = require('mongodb');
const url = 'mongodb://root:woaijtt5201314..@localhost:27017/';
const dbName = 'firend';

//注册web服务
http.createServer(app).listen(3000);

//配置路由
app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('首页');
})

//配置路由
app.get('/login', function (req, res) {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            return
        }
        let db = client.db(dbName);
        db.collection('firend').find({}).toArray((err, result) => {
            if (err) {
                console.log(err);
                return
            }
            // console.log(result);
            client.close();
            res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
            console.log(result);
            res.end('登录页面'+JSON.stringify(result));
        })
    });
})

//配置路由
app.get('/news', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    res.end('新闻页面');
})
// db.createUser( { user: "firendadmin", pwd: "1831127026woaijtt5201314..", roles: [ { role: "dbOwner", db: "firend" } ] } )
/**
 * db.createUser( { user: "eggadmin", pwd: "123456", roles: [ { role: "dbOwner", db: "eggcms" } ] } )
 */
console.log('server in localhost:3000');
