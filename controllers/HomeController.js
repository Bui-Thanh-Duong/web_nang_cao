export const renderHome = (req, res) => {
    const userid = req.session.userid;
    const username = req.session.username;
    res.render('home', { content: 'pages/main', username, userid});
};