const express = require('express');
const cookieParser = require('cookie-parser');
const database = require('./database.js');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const activeSessionTokens = new Set();

const generateSessionToken = (username) => {
    const timestamp = Date.now();
    return `${username}_${timestamp}`;
};

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/landing-page.html');
});

const requireAuth = (req, res, next) => {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken || !isValidSessionToken(sessionToken)) {
        return res.redirect('/login.html');
    }

    next();
};

app.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isValidCredentials(username, password)) {
        const sessionToken = generateSessionToken(username);
        res.cookie('sessionToken', sessionToken, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Incorrect username or password' });
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('sessionToken');
    res.redirect('/login.html');
});

function isValidSessionToken(sessionToken) {
    return activeSessionTokens.has(sessionToken);
}

function isValidCredentials(username, password) {
    return database.users.some(user => user.username === username && user.password === password);
}

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (isValidCredentials(username, password)) {
        const sessionToken = generateSessionToken(username);
        activeSessionTokens.add(sessionToken);
        return res.status(200).send(sessionToken);
    } else {
        return res.status(401).send("Unauthorized");
    }
});

app.get('/api/:username/city', (req, res) => {
    const username = req.params.username;
    const user = database.users.find(user => user.username === username);

    if (user) {
        return res.status(200).send(user.city);
    } else {
        return res.status(404).json({ error: 'City not found for the given username' });
    }
});

app.get('/api/:username/profile-picture-url', (req, res) => {
    const username = req.params.username;
    const user = database.users.find(user => user.username === username);
    console.log(user)
    if (user) {
        return res.status(200).json({ profilePictureUrl: user.profilePicturePath });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});