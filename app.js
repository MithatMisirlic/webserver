const express = require('express');
const database = require('./database.js');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const generateSessionToken = (username) => {
    const timestamp = Date.now();
    return `${username}_${timestamp}`;
};

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/landing-page.html');
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.post('/api/login', (req, res) => {
    let isAuthenticated = false;

    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {
            const sessionToken = generateSessionToken(userToCheck.username);

            return res.status(200).json({
                message: 'You have been authenticated',
                token: sessionToken,
            });
        }
    }

    res.status(401).json({
        error: 'You are unauthenticated due to wrong username or password',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});