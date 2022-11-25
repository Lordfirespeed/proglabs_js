const recipes = require('./potato_recipes.json');

const body_parser = require('body-parser');
const express = require('express');
const app = express();

app.use(body_parser.urlencoded({ extended: false }));

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

app.post('/recipes/new', function(req, resp){
    let { title, href, ingredients, thumbnail } = req.body;
    console.log(title, href, ingredients, thumbnail);
    if ([title, href, ingredients, thumbnail].some(element => (element === undefined))) {
        return resp.status(400).send("Fields are missing.");
    }

    let new_recipe = {title, href, ingredients, thumbnail};
    recipes.push(new_recipe)
    resp.send("Successfully added recipe.")
})

app.listen(8080)