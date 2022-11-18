const http = require("http");

const hostname = '127.0.0.1';
const port = 9090;

const server = http.createServer();

server.on('request', (request, response) => {
    // the same kind of magic happens here!
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

