const { RequestHandler } = require("./echo_app");
const http = require("http");

const hostname = '127.0.0.1';
const port = 9095;

function main(hostname, port) {
    http.createServer().on('request', (request, response) => {
        // the same kind of magic happens here!
        const handler = new RequestHandler(request, response);
        handler.handle();
    }).listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

if (typeof require !== 'undefined' && require.main === module) {
    main(hostname, port);
}