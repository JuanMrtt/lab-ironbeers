const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => res.render('beers', {
            allBeers: beersFromApi
        }))
        .catch(error => console.log(error));
})

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
        .then(beersFromApi => {
            res.render('random-beers', {
                randomBeer: beersFromApi[0]
            })
            console.log(beersFromApi[0])
        }
        )
        .catch(error => console.log(error));
})

// res.render('random-beers'));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
