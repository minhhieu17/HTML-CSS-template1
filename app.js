const http = require('http');
const fs = require('fs');
const path = require('path');


const getMethods = () => {

    http.createServer(function(req, res){
        if (req.url === "/") {
            fs.readFile("./public/views/index.html", function(err, html){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        }
        else if (req.url === "/login") {
            fs.readFile("./public/views/login.html", function(err, html){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        } 
        else if (req.url === "/register") {
            fs.readFile("./public/views/register.html", function(err, html){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        }
        else if (req.url.match("\.css")) {
            var cssPath = path.join(__dirname,req.url);
            var fileStream = fs.createReadStream(cssPath);
            res.writeHead(200, {"Content-Type": "text/css"});
            fileStream.pipe(res);
        } 
        else if (req.url.match("\.woff2")) {
            var fontPath = path.join(__dirname,req.url);
            var fileStream = fs.createReadStream(fontPath);
            res.writeHead(200, {"Content-Type": "font/woff2"});
            fileStream.pipe(res);
        } else if (req.url.match("\.png")) {
            var imagePath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "image/png"});
            fileStream.pipe(res);
        } else if (req.url.match("\.jpg")) {
            var imagePath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "image/jpg"});
            fileStream.pipe(res);
        } else if (req.url.match("\.js")) {
            var imagePath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, {"Content-Type": "script/javascript"});
            fileStream.pipe(res);
        }
    }).listen(3000);
}
getMethods();   
const postMethods = () => {
    // 2 APIs
    // POST /api/register
    // POST /api/login
}


