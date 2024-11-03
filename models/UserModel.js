// userModel.js
import db from '../config/db.js';

export const getAllUsers = async () => {
    return await db.query('SELECT * FROM users, roles WHERE users.roleid = roles.roleid');
};

export const getUsersByRole = async (roleid) => {
    return await db.query('SELECT * FROM users, roles WHERE users.roleid = roles.roleid AND users.roleid = ?', [roleid]);
};

export const getUserById = async (userid) => {
    const [rows] = await db.query('SELECT * FROM users, roles WHERE userid = ? AND users.roleid = roles.roleid', [userid]);
    return rows[0];
};

export const updateUserById = async (userid, userData) => {
    const { username, password, fullname, address, sex, email } = userData;
    await db.query('UPDATE users SET username = ?, password = ?, fullname = ?, address = ?, sex = ?, email = ? WHERE userid = ?', 
                   [username, password, fullname, address, sex, email, userid]);
};

export const deleteUserById = async (userid) => {
    await db.query('DELETE FROM users WHERE userid = ?', [userid]);
};

export const createUser = async (userData) => {
    const { username, password, fullname, sex, email, address, role } = userData;
    await db.query('INSERT INTO users (username, password, fullname, sex, email, address, roleid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                   [username, password, fullname, sex, email, address, role]);
};

export const apiGetAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

export const apiGetUserById = async (userid) => {
    const [rows] = await db.query('SELECT * FROM users WHERE userid = ?', [userid]);
    return rows.length > 0 ? rows[0] : null;
};

export const apiUpdateUserById = async (userid, userData) => {
    const { fullname, address, sex, email } = userData;
    await db.query('UPDATE users SET fullname = ?, address = ?, sex = ?, email = ? WHERE userid = ?', 
                   [fullname, address, sex, email, userid]);
};

export const apiDeleteUserById = async (userid) => {
    await db.query('DELETE FROM users WHERE userid = ?', [userid]);
};

export const getUserByUsername = async (username) => {
    const [[user]] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return user;
};