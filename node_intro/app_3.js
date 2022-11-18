const finalhandler = require('finalhandler')
const http = require('http')
const Router = require('router')

const port = 8080;
const hostname = "127.0.0.1"

function main(hostname, port) {
    const router = Router()
    router.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Hello World!')
    })

    router.post('/echo', function (req, res) {
        try {
            res.setHeader("Content-Type", req.headers["content-type"])
        } catch (error) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/json")
            res.end(JSON.stringify({"code": res.statusCode, "message": "Bad Request"}));
            return;
        }

        req.pipe(res).then(() => res.end())
    })

    const server = http.createServer(function (req, res) {
        router(req, res, finalhandler(req, res))
    })

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

if (typeof require !== 'undefined' && require.main === module) {
    main(hostname, port);
}
