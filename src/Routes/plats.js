const { Router } = require("express");
const path = require('path');
const express = require("express");
//const PlatRouter = Router()
const sqlite3 = require('sqlite3').verbose(); // Require SQLite module
const PlatRouter = express.Router();


// SQLite database setup
const db = new sqlite3.Database(path.join(__dirname, '../DB', 'test.db'));


app=express()
// Set views directory


const data_plats = [
    {
        "id": "1",
        "name": "shawarma"
    },
    {
        "id": "2",
        "name": "tortilla"
    }
]


PlatRouter.get('/plat/:name', (req, res) => {
    console.log("Just got a request!");
    const { name } = req.params;
    const resultat = data_plats.find((g) => g.name === name);
    if (resultat) { /// => resultat != null || resultat != undefined || resultat != ""
        res.send(resultat);
    } else {
        res.send(req.params);
    }
});




PlatRouter.get('/plats', (req, res) => {
    const data = { title: 'Plats Page', plats: data_plats };
    res.render('plats', data);
});



// Route to handle order placement
app.post('/order', (req, res) => {
    const { id, count, address } = req.body;

    // TODO: Insert the data into the SQLite database
    db.run('INSERT INTO orders (id, count, address) VALUES (?, ?, ?)', [id, count, address], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Order placed successfully!');
        }
    });
});



///    plats="../view/plats.html"
   // res.send(plats);


/*
PlatRouter.get('/plat/:name', (req, res) => {
    console.log("Just got a request!");
    const { name } = req.params;
    resultat = data_plats.find((g) => g.name === name);
    if (resultat != null || resultat != undefined || resultat != "")
        res.send(resultat);
    else
        res.send(req.params);
})

PlatRouter.get('/plats', (req, res) => {
    console.log("Just got a request!");
    var plats="";
    for(i=0;i<data_plats.length;i++)
    {
        plats += '<h1>' +data_plats[i].name + '</h1>';
    }
    res.send(plats);
})
*/

module.exports = PlatRouter;