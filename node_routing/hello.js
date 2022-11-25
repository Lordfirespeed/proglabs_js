const express = require('express')
const app = express()

app.get('/', function(req, resp){
    resp.send('Hello world')
})

app.get('/foo', function(req, resp){
    resp.send("bar")
})

app.get('/wave/:at', function (req, resp){
    resp.send(`waving at ${req.params.at}`)
})

app.listen(8090)