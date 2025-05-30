// model/user.js
import mongoose from 'mongoose';

// Define the roles as an object
const UserRole = {
    ISSUE_LOGGER: 'Issue Logger',
    ISSUE_RESOLVER: 'Issue Resolver',
    ISSUE_VIEWER: 'Issue Viewer',
    LOGGER_RESOLVER: 'Logger + Resolver',
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
        default: UserRole.ISSUE_VIEWER,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export { User, UserRole };