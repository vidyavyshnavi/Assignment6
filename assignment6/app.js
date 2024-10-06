const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index'); 
});
app.get('/login', (req, res) => {
    res.render('login'); 
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/service', (req, res) => {
    res.render('service');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/badminton', (req, res) => {
    res.render('badminton');
});
app.get('/cricket', (req, res) => {
    res.render('cricket');
});
app.get('/football', (req, res) => {
    res.render('football');
});
app.use('/basketball', (req, res) => {
    res.render('basketball');
});



app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(7090, () => {
    console.log('Server is running @ http://localhost:7090');
});