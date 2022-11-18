const { RequestHandler } = require("./app_2_electric_boogaloo");
const http = require("http");

const hostname = '127.0.0.1';
const port = 9090;

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