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

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/landing-page.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

app.post('/api/login', (req, res) => {
    let isAuthenticated = false;

    for (let i = 0; i < database.users.length; i++) {
        const userToCheck = database.users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password) {
            const sessionToken = generateSessionToken(userToCheck.username);
            isAuthenticated = true;
            return res.status(200).send(sessionToken);
        }
    }
        if (isAuthenticated === false){
            res.status(401).send("unauthenticated");
        }
});

app.get('/api/:username/city', (req, res) => {
    const username = req.params.username;
    const city = database.getUserCity(username);

    if (city) {
        res.status(200).send(city);
    } else {
        res.status(404).json({
            error: 'City not found for the given username',
        });
    }
});

app.get('/api/:username/profile-picture-url', (req, res) => {
    const username = req.params.username;
    const user = database.users.find((user) => user.username === username);

    if (user) {
        res.status(200).json({
            profilePictureUrl: user.profilePicturePath,
        });
    } else {
        res.status(404).json({
            error: 'User not found',
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});