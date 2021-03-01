const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  punkAPI.getBeers() // Returns an array with all beers 
  .then(apiBeers => 
    res.render("beers", {apiBeers}))
  .catch(err => console.log(err))
})

app.get("/random-beers", (req, res) => {
  punkAPI.getRandom() // Returns an array of length 1 with a random beer
  .then(randomApiBeer => 
    res.render("random-beer", {randomApiBeer}))
  .catch(err => console.log(err))
})

app.get("/beers/beer-:id", (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(beer => {
    res.render("beer-detail", {beer})
  })
  .catch(err=>console.log(err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
