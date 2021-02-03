const fs = require('fs');
const url = require('url');
const path = require('path');

let getFileType = (extName) => {
    let ectMime = fs.readFileSync("./data/mime.json");
    var mobj = JSON.parse(ectMime.toString());
    return mobj[extName];
}

exports.static = (req, res, staticPath) => {

    if (req.url === '/favicon.ico') {
        return
    };
    let staticFileUrl = url.parse(req.url).pathname;
    staticFileUrl = staticFileUrl === '/' ? 'index.html' : staticFileUrl;

    try {
        var data = fs.readFileSync(`./${staticPath}/${staticFileUrl}`);
        if (data) {
            let staticFileHead = path.extname(staticFileUrl);
            staticFileHead = getFileType(staticFileHead);
            res.writeHead(200, { "Content-type": staticFileHead + ";charset='utf-8'" });
            res.end(data);
        }
    } catch (error) {
        console.log(error);
    }
};