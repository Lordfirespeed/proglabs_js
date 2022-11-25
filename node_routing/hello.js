const express = require('express')
const app = express()

app.get('/', function(req, resp){
    resp.send('Hello world')
})

app.get('/foo', function(req, resp){
    resp.send("bar")
})

app.listen(8090)