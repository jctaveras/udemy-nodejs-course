const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const PORT = process.env.PORT || 3000; 

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next) {
    const now = new Date().toString();
    const log = `${now}: ${request.method} ${request.url}`;
    fs.appendFileSync('./logs/server.log', log + '\n');
    next(); 
});

app.get('/', function(request, response) {
    response.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hello Express from Handlebars'
    });
});

app.get('/about', function(request, response) {
    response.render('about.hbs', {
        pageTitle: 'About'
    });
})

app.listen(PORT, function() {
    console.log(`Server is up on port: ${PORT}`);
});
