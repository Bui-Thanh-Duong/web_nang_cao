import mongoose from 'mongoose';

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

// Tạo model User
const User = mongoose.model('User', userSchema);

export default User;
