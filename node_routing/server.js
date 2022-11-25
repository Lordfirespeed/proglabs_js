const recipes = require('./potato_recipes.json');

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

app.get('/book', function(req, resp){
    if (req.query.id === undefined) {
        resp.send("You haven't asked for any particular ID.")
        return
    }
    resp.send(`here is book with ID ${req.query.id}`)
})

app.listen(8090)