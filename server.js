import express from 'express';
import dotenv from 'dotenv/config';
import myDateTime from './date';
import getURL from './getURL';
import viewEngine from './viewEngine';
import path from 'path';

import { renderHome } from './controllers/HomeController.js';
import { renderAbout } from './controllers/AboutController.js';
import { renderContact } from './controllers/ContactController.js';

const app = express();
viewEngine(app);
const port=process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', renderHome);
app.get('/home', renderHome);
app.get('/about', renderAbout);
app.get('/contact', renderContact);

app.get('/date', (req, res) => {
    const date = myDateTime();
    res.send(date);
});
app.get('/geturl', (req, res) => {
    const getParamsURL = getURL.getParamsURL(req);
    const getPath = getURL.getPath(req);
    res.send({ getParamsURL, getPath });
});

app.get('/ejs', (req, res) => { 
    res.render("test");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});