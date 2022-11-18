const http = require("http");

const hostname = '127.0.0.1';
const port = 9090;

const server = http.createServer();

server.on('request', (request, response) => {
    // the same kind of magic happens here!
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    });
    request.on('data', (chunk) => {
        body.push(chunk);
    });
    request.on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

