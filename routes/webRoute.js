import express from 'express';
import { renderHome } from '../controllers/HomeController.js';
import { renderAbout } from '../controllers/AboutController.js';
import { renderContact } from '../controllers/ContactController.js';
import * as UserController from '../controllers/UserController.js';
import { renderLogin, handleLogin } from '../controllers/LoginController.js';

const router = express.Router();

router.get('/', renderHome);
router.get('/home', renderHome);
router.get('/about', renderAbout);
router.get('/contact', renderContact);

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users/add', UserController.createUser);
router.post('/users/edit/:id', UserController.updateUser);
router.get('/users/delete/:id', UserController.deleteUser);

router.get('/login', renderLogin);
router.post('/checklogin', handleLogin);

router.get('/api/users', UserController.apiGetUsers);
router.get('/api/users/:id', UserController.apiGetUserById);
router.post('/api/users', UserController.apiCreateUser);
router.put('/api/users/:id', UserController.apiUpdateUser);
router.delete('/api/users/:id', UserController.apiDeleteUser);
router.post('/api/login', UserController.apiLogin);
router.post('/api/logout', UserController.apiLogout);

export default router;
