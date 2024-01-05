const { Router } = require("express");
const path = require('path');
const express = require("express");

const sqlite3 = require('sqlite3').verbose(); // Require SQLite module
const SPAMRouter = express.Router();


app=express()
// Set views directory



SPAMRouter.get('/Ip/:Ip', (req, res) => {
    console.log("Just got a request!");
    const { Ip } = req.params;
    res.send("ok");
    /*
    const resultat = data_plats.find((g) => g.name === Ip);
    if (resultat) { /// => resultat != null || resultat != undefined || resultat != ""
        res.send(resultat);
    } else {
        res.send(req.params);
    }
    */
});





module.exports = SPAMRouter;