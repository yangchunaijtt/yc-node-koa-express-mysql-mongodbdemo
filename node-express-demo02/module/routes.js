const url = require('url');

let server = () => {
    let G = {};
    let app = (req,res) => {
        let pathname = url.parse(req.url).pathname;
        console.log("执行app",G)
        if(G[pathname]) {
            G[pathname](req,res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' });
            res.end('页面不存在');
        }
    };
    app.get = (str,cb) => {
        G[str] =cb;
        console.log("执行get",G)
    };
    return app;
}

module.exports=server();

