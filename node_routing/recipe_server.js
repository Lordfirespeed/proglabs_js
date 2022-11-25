const recipes = require('./potato_recipes.json')

const express = require('express')
const app = express()

app.get('/recipes', function(req, resp){
    let search_term = req.query.search_term;
    if (search_term === undefined) {
        let data = {"recipes": recipes}
        resp.send(data)
        return
    }
    search_term = search_term.toLowerCase();
    let matched_recipes = recipes.filter(recipe => recipe.title.toLowerCase().match(search_term));

    let data = {"recipes": matched_recipes}
    if (matched_recipes.length === 0) {
        data.message = "No recipes found."
    } else {
        data.message = `Found ${matched_recipes.length} matching recipes.`
    }

    resp.send(data)
})

app.listen(8080)