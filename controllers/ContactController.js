export const renderContact = (req, res) => {
    const username = req.session.username;
    res.render('home', { content: 'pages/contact', username });
}; 