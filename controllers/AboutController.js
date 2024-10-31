export const renderAbout = (req, res) => {
    const username = req.session.username;
    res.render('home', { content: 'pages/about', username });
};