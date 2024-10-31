import db from '../config/db.js';

export const getUsers = async (req, res) => {
    const username = req.session.username;
    const [rows] = await db.query('SELECT * FROM users');
    res.render('home', { content: 'pages/users', users: rows, username });
};

export const getUserById = async (req, res) => {
    const username = req.session.username;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.render('home', { content: 'pages/userDetails', user: rows[0], username });
};

export const updateUser = async (req, res) => {
    const { fullname, address, sex, email } = req.body;
    await db.query('UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?', 
                   [fullname, address, sex, email, req.params.id]);
    res.redirect('/users');
};

export const deleteUser = async (req, res) => {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.redirect('/users');
};

export const createUser = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;
    await db.query('INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
                   [username, password, fullname, address, sex, email]);
    res.redirect('/users');
};

export const apiGetUsers = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
};

export const apiGetUserById = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
        res.json(rows[0]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};

export const apiCreateUser = async (req, res) => {
    const { username, password, fullname, address, sex, email } = req.body;
    await db.query('INSERT INTO users (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ?)', 
                   [username, password, fullname, address, sex, email]);
    res.status(201).json({ message: 'User created successfully' });
};

export const apiUpdateUser = async (req, res) => {
    const { fullname, address, sex, email } = req.body;
    await db.query('UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE id = ?', 
                   [fullname, address, sex, email, req.params.id]);
    res.json({ message: 'User updated successfully' });
};

export const apiDeleteUser = async (req, res) => {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted successfully' });
};

export const apiLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    req.session.username = username;
    res.json({ message: 'Login successful' });
};

export const apiLogout = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
};

const getUserByUsername = async (username) => {
    const [[user]] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return user;
};