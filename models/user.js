import mongoose from 'mongoose';

export const UserRole = Object.freeze({
    ISSUE_LOGGER: 'ISSUE_LOGGER',
    ISSUE_RESOLVER: 'ISSUE_RESOLVER',
    ISSUE_VIEWER: 'ISSUE_VIEWER',
    LOGGER_RESOLVER: 'LOGGER_RESOLVER',
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        password: {
            type: String,
            required: true,
            select: false, // 🔐 critical
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.ISSUE_VIEWER,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
