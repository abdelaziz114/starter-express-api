const express = require('express')
const app = express()
const PlatRouter=require("/workspaces/starter-express-api/src/Routes/plats")
const session =require("express-session");

app.use(express.json());
app.use(express.urlencoded());


app.post('/', (req, res) => {
    console.log("Just got a request!");
    res.send('post!');
})

app.get('/', (req, res) => {
    console.log("Just got a request!");
    res.send('<h1>post!</h1>');
})
app.use(PlatRouter);

app.listen(process.env.PORT || 3000)