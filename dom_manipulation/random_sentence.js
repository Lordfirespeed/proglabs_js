let adjectives, nouns, verbs, adverbs

let adjectives_promise = fetch("adjectives.json").then(stream => stream.json()).then(json_object => adjectives = json_object)
let nouns_promise = fetch("nouns.json").then(stream => stream.json()).then(json_object => nouns = json_object)
let verbs_promise = fetch("verbs.json").then(stream => stream.json()).then(json_object => verbs = json_object)
let adverbs_promise = fetch("adverbs.json").then(stream => stream.json()).then(json_object => adverbs = json_object)

// ref #1 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function random_int(max) {
    return Math.floor(Math.random() * max);
}
// end ref #1

function random_choice(indexable) {
    let index = random_int(indexable.length);
    return indexable[index]
}

function random_sentence() {
    return `The ${random_choice(adjectives)} ${random_choice(nouns)} ${random_choice(verbs)} ${random_choice(adverbs)}`
}

function connect_to_button() {
    let button = document.getElementById("generate-new-sentence-button");
    let field = document.getElementById("random-sentence-container");
    if (button === null || field === null) {return}
    button.addEventListener("click", () => {
        field.innerHTML = random_sentence();
    })
}

document.addEventListener("DOMContentLoaded", () =>
    Promise.all([adjectives_promise, nouns_promise, verbs_promise, adverbs_promise]).then(connect_to_button)
)