const http = require('http');
const fs = require('fs');
const path = require('path');
const { getUser, getUsers, createUser, matchUser } = require('./src/controller/userController');

const getMethods = (req, res) => {
    if (req.url === "/") {
        fs.readFile("./public/views/index.html", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }
    else if (req.url === "/views/login") {
        fs.readFile("./public/views/login.html", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }
    else if (req.url === "/views/register") {
        fs.readFile("./public/views/register.html", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    }
    else if (req.url === "/api/users") {
        getUsers(req, res);
    }
    else if (req.url.match(/\/api\/users\/([0-9]+)/)) {
        const id = req.url.split("/")[3];
        getUser(req, res, id)
    }
    else if (req.url.match("\.css")) {
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
    }
    else if (req.url.match("\.woff2")) {
        var fontPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { "Content-Type": "font/woff2" });
        fileStream.pipe(res);
    }
    else if (req.url.match("\.png")) {
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
    }
    else if (req.url.match("\.jpg")) {
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fileStream.pipe(res);
    }
    else if (req.url.match("\.js")) {
        var jsPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fileStream.pipe(res);
    }
}

const postMethods = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        res.end(data);
    });
    if (req.url === "/api/users/register") {
        createUser(req, res);
    }
    if (req.url === "/api/users/login") {
        matchUser(req, res);
    }
}

http.createServer(function (req, res) {
    switch (req.method) {
        case 'GET': {
            getMethods(req, res);
            break;
        }
        case 'POST': {
            postMethods(req, res);
            break;
        }

        default: {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(`
                message : 'Endpoint not found'
            `);
        }
    }
}).listen(3000, (err) => {
    console.log('connected', err)
});
