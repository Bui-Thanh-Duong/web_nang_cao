// HomeController.js
export const renderHome = (req, res) => {
    const username = req.session.username; // Lấy tên người dùng từ session
    res.render('home', { content: 'pages/main', username }); // Truyền username vào view
};
