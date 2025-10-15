const connect = require('connect');
const http = require('http');
const url = require('url');

const app = connect();


app.use((req, res, next) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/'){
    const method = parsedUrl.query.method;
    const x = parseFloat(parsedUrl.query.x);
    const y = parseFloat(parsedUrl.query.y);

    if (method === "add"){
        var result = x + y;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`${x} + ${y} = ${result}`);
    }
    else if (method === "subtract"){
        var result = x - y;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`${x} - ${y} = ${result}`);
    }
    else if (method === "multiply"){
        var result = x * y;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`${x} * ${y} = ${result}`);
    }
    else if (method === "divide"){
        var result = x / y;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`${x} / ${y} = ${result}`);
    }
}
else{
    next();
}
});
  
app.use((req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found!');
});

http.createServer(app).listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});