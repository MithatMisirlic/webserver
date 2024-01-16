const express = require('express')
const database = require("./database.js")

const app = express()
const port = 3000

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.post("/api/login", function (req, res){
    let hasAuthenticatedUser = false;

    for (let i =0; i < database.users.length; i++){
        const userToCheck = database.users[i];

        if (userToCheck.username === req.body.username && userToCheck.password === req.body.password){
            res.send("Authenticated")
            hasAuthenticatedUser = true;
            break;
        }
    }

    if (hasAuthenticatedUser === false){
        res.send("Unauthenticated")
    }

})

app.listen(port, function (){
    console.log(`Example app listening on port ${port}`)
})
