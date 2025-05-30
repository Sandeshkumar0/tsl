// controllers/authcontroller.js
import bcrypt from 'bcrypt';
import { User, UserRole } from '../model/user.js';
import { sendLoginNotification } from '../utils/sendEmail.js';

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
        return res.status(400).send('Invalid role');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        res.redirect('/api/login');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Invalid credentials');
        }

        // Store user in session
        req.session.user = user;

        // Send login notification email
        await sendLoginNotification(user.email, user.username);

        res.redirect('/api');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

export { register, login };