// middleware/authmiddleware.js
import { UserRole } from '../model/user.js';

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/api/login');
    }
    next();
};

const canLogIssue = (req, res, next) => {
    const userRole = req.session.user.role;
    if (
        userRole === UserRole.ISSUE_LOGGER ||
        userRole === UserRole.LOGGER_RESOLVER
    ) {
        return next();
    }
    res.status(403).send('Forbidden: You cannot log issues');
};

const canResolveIssue = (req, res, next) => {
    const userRole = req.session.user.role;
    if (
        userRole === UserRole.ISSUE_RESOLVER ||
        userRole === UserRole.LOGGER_RESOLVER
    ) {
        return next();
    }
    res.status(403).send('Forbidden: You cannot resolve issues');
};

const canViewIssue = (req, res, next) => {
    // All roles can view issues
    next();
};

export { isAuthenticated, canLogIssue, canResolveIssue, canViewIssue };