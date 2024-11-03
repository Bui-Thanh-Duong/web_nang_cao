// LoginModel.js
import db from '../config/db.js';

export const getUserByUsername = async (username) => {
    const [[user]] = await db.execute(
        'SELECT * FROM users, roles WHERE users.roleid = roles.roleid AND username = ?',
        [username]
    );
    return user;
};
