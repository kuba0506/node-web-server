const express = require('express');
const hbs = require('hbs'); //handlebar template engine
const fs = require('fs');

var app = express(),
    port = 3000;

//config
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});

//middleware
app.use((req, res, next) => {
    var now = new Date().toString(),
        log = `${now}: ${req.method}, path: ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    })

    next();
});

//Maintenance page
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: "Maintenance page",
//         welcomeMsg: 'Welcome to my page'
//     });
//     next();
// });

app.use(express.static(__dirname + '/public')); //absolute path

//endpoints
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to my page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

//start app
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
