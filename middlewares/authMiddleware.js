// middlewares/authMiddleware.js
export const checkAuth = (req, res, next) => {
    // Kiểm tra xem người dùng có đăng nhập không
    if (!req.session.username) {
        return res.send ( 'Thông báo: Vui lòng đăng nhập');
    }
    next(); // Tiếp tục nếu đã đăng nhập
};

export const checkAdmin = (req, res, next) => {
    // Kiểm tra xem người dùng có phải là admin không
    if (req.session.roleid !== 1) { // 1 tương ứng với admin
        return res.send ('Thông báo: Chỉ admin mới thực hiện được chức năng này.' );
    }
    next(); // Tiếp tục nếu là admin
};

export const checkUser = (req, res, next) => {
    const userId = req.params.userid; // Lấy user ID từ params
    if (userId == req.session.userid || req.session.roleid === 1) {
        // Cho phép nếu user đang truy cập chính mình hoặc là admin
        return next();
    }
    return res.send( 'Thông báo: Bạn chỉ có thể truy cập vào tài khoản của riêng bạn.' );
};