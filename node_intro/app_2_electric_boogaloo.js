const http = require("http");

const hostname = '127.0.0.1';
const port = 9090;


class RequestHandler {
    constructor(request, response) {

        this.request = request;
        this.response = response;

        this.headers = null;
        this.method = null;
        this.url = null;
        this.body = [];
    };

    handle() {
        try {
            this.parse()
            this.listen()
        } catch (error) {
            this.handle_error(error)
        }
    }

    handle_error(error) {
        if (error.name === "HTTPError") {
            this.handle_http_error(error)
        } else {
            this.handle_internal_error(error)
        }
    }

    handle_http_error(error) {
        this.response.statusCode = error.response.statusCode;
        this.response.end(JSON.stringify(error.data));
        console.log(error);
    }

    handle_internal_error(error) {
        this.response.statusCode = 500;
        const response_body = {message: "Internal server error"}
        this.response.end(JSON.stringify(response_body));
        console.log(error);
    }

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
            try {
                this.select_response();
            } catch (error) {
                this.handle_error(error)
            }
        });
    }

    http_error(code, message) {
        const exception = new Error();
        exception.name = "HTTPError";
        exception.response = {
            statusCode: code,
            data: {
                message: message
            }
        }
        throw exception;
    }

    select_response() {
        if (this.request.url === "/echo") {
            if (this.request.method !== "POST") {
                this.http_error(405, "Method not allowed. Use POST");
                return;
            }

            this.response.end(this.body);

        } else {
            this.construct_response();
        }
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

    on_post_to_echo() {

    }

}


const server = http.createServer();

server.on('request', (request, response) => {
    // the same kind of magic happens here!
    const handler = new RequestHandler(request, response);
    handler.handle();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

