import express from 'express';
import path from 'path';

export default function(app) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
}