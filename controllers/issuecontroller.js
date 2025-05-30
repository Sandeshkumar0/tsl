// controllers/issuecontroller.js
import Issue from '../model/issue.js';
import { User } from '../model/user.js';

const logIssue = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.session.user._id;

    try {
        await Issue.create({
            title,
            description,
            status: 'Open',
            createdBy: userId,
        });
        res.redirect('/api');
    } catch (error) {
        res.status(500).send('Error logging issue');
    }
};

const resolveIssue = async (req, res) => {
    const { issueId, remarks } = req.body;
    const userId = req.session.user._id;

    try {
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).send('Issue not found');
        }

        await issue.updateOne({
            status: 'Closed',
            remarks,
            resolvedBy: userId,
        });
        res.redirect('/api');
    } catch (error) {
        res.status(500).send('Error resolving issue');
    }
};

const viewIssues = async (req, res) => {
    try {
        const issues = await Issue.find()
            .populate('createdBy', 'username')
            .populate('resolvedBy', 'username');
        res.render('dashboard.ejs', { issues, user: req.session.user });
    } catch (error) {
        res.status(500).send('Error fetching issues');
    }
};

export { logIssue, resolveIssue, viewIssues };