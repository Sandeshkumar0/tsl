// controllers/authcontroller.js
import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);
        req.session.user = user; // minimal data only
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
