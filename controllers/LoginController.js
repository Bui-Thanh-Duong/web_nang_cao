// LoginController.js
import { getUserByUsername } from '../models/LoginModel.js';

export const renderLogin = (req, res) => res.render('./login');

export const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
        return res.status(404).send("Sai tên tài khoản và mật khẩu");
    }
    if (user.password !== password) {
        return res.status(401).send("Sai mật khẩu");
    }
    req.session.roleid = user.roleid;
    req.session.userid = user.userid;
    req.session.username = username;
    return res.redirect('/home');
};
