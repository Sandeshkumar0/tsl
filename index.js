// index.js
import express from 'express';
import connectdb from './config/db.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import authRoutes from './routes/authroutes.js';

const app = express();

// Session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a secure key
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

connectdb();

// Use auth routes
app.use('/api', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.redirect('/api');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});