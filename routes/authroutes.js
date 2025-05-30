// routes/authroutes.js
import express from 'express';
import { register, login } from '../controllers/authcontroller.js';
import { logIssue, resolveIssue, viewIssues } from '../controllers/issuecontroller.js';
import { isAuthenticated, canLogIssue, canResolveIssue, canViewIssue } from '../middleware/authmiddleware.js';

const router = express.Router();

// Auth routes
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/register', register);
router.post('/login', login);

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/api/login');
    });
});

// Issue routes
router.get('/', isAuthenticated, canViewIssue, viewIssues);
router.post('/issues/log', isAuthenticated, canLogIssue, logIssue);
router.post('/issues/resolve', isAuthenticated, canResolveIssue, resolveIssue);

export default router;