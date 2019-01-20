const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    } );
    next();
});

// app.use((req,res,next) => {
//     res.render('meintance.hbs');
// });

app.use(express.static(__dirname + '/public/'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage  : 'This is home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'This is AboutPage'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error response' 
    });
});

app.listen(3000);