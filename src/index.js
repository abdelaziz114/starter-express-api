const express = require('express')
const app = express()
const path = require('path');
const PlatRouter=require("/workspaces/starter-express-api/src/Routes/plats")
const SPAMRouter=require("/workspaces/starter-express-api/src/Routes/Spam")
const session =require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:"oaiaosgjsmklgshgthaoithaotioatoa",
    resave:false,
    saveUninitialized:false,
}))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,  'view')); // Adjust the path accordingly


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
    console.log("Just got a request!");
    res.send('post!');
})

app.get('/', (req, res) => {
    console.log("Just got a request!");
    res.send('<h1>get!</h1>');
})
app.use(PlatRouter);
app.use(SPAMRouter);
app.listen(process.env.PORT || 3000)