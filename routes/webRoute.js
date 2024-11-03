import express from 'express';
import { renderHome } from '../controllers/HomeController.js';
import { renderAbout } from '../controllers/AboutController.js';
import { renderContact } from '../controllers/ContactController.js';
import * as UserController from '../controllers/UserController.js';
import { renderLogin, handleLogin } from '../controllers/LoginController.js';
import { checkAuth, checkAdmin, checkUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes không yêu cầu đăng nhập
router.get('/', renderHome);
router.get('/home', renderHome);
router.get('/about', renderAbout);
router.get('/contact', renderContact);

// Route cho quản lý người dùng - chỉ cho admin
router.get('/users', checkAdmin, UserController.getUsers); // Chỉ admin
router.get('/users/:userid', checkUser, UserController.getUserById); // User hoặc Admin

// Route cho tạo người dùng - cho người dùng chưa đăng nhập
router.get('/usersadd', UserController.renderCreateUser); // Cho cả người dùng chưa đăng nhập
router.post('/createuser', UserController.createUser); // Cho cả người dùng chưa đăng nhập

// Route cho cập nhật người dùng - chỉ cho user có quyền cập nhật chính họ
router.get('/users/edit/:userid', checkUser, UserController.getupdateUser); // Hiển thị form cập nhật
router.post('/updateUser/:userid', checkUser, UserController.updateUser); // Xử lý cập nhật

// Route cho xóa người dùng - chỉ cho admin
router.get('/users/delete/:userid', checkAdmin, UserController.deleteUser); // Chỉ admin

// Route cho đăng nhập
router.get('/login', renderLogin);
router.post('/checklogin', handleLogin);

// API routes
router.get('/api/users', UserController.apiGetUsers);
router.get('/api/users/:id', UserController.apiGetUserById);
router.post('/api/users', UserController.apiCreateUser);
router.put('/api/users/:id', UserController.apiUpdateUser);
router.delete('/api/users/:id', UserController.apiDeleteUser);
router.post('/api/login', UserController.apiLogin);
router.post('/api/logout', UserController.apiLogout);

export default router;
