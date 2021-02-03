// 代码块 node-http-server
//  03 supervisor 自启动工具的使用  npm -g install supervisor   使用  supervisor app01.js

const http = require('http');
const url = require('url');

console.log("你好,node.js");

http.createServer((req,res)=>{
    const queryText = url.parse(req.url,true).query;
    // 设置响应头
    res.writeHead(200,{"Content-type":"text/html;charset='utf-8'"});
    let bodyText = '<head><meta charset="UTF-8"></head>';  // 解决乱码问题
    if(Object.keys(queryText).length){
        bodyText = JSON.stringify(queryText);
    }
    res.write(bodyText)
    res.end('  resend111222'); // 结束响应
}).listen(3002);

