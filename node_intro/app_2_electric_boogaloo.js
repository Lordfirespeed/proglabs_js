const http = require("http");

const hostname = '127.0.0.1';
const port = 9090;

const server = http.createServer();

class RequestHandler {
    constructor(request, response) {

        this.request = request;
        this.response = response;

        this.headers = null;
        this.method = null;
        this.url = null;
        this.body = [];

        this.parse()
        this.listen()
    };

    parse() {
        const { headers, method, url } = this.request;
        this.headers = headers;
        this.method = method;
        this.url = url;
    }

    listen() {
        this.request.on('error', (err) => {
            console.error(err);
        });
        this.request.on('data', (chunk) => {
            this.body.push(chunk);
        });
        this.request.on('end', () => {
            this.body = Buffer.concat(this.body).toString();
            // At this point, we have the headers, method, url and body, and can now
            // do whatever we need to in order to respond to this request.
            this.construct_response();
        });
    }

    construct_response() {
        this.response.on('error', (err) => {
            console.error(err);
        });

        this.response.statusCode = 200;
        this.response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = {headers: this.headers, url: this.url, method: this.method, body: this.body}

        this.response.write(JSON.stringify(responseBody));
        this.response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))
    }
}

server.on('request', (request, response) => {
    // the same kind of magic happens here!
    new RequestHandler(request, response);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

