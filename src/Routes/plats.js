const { Router } = require("express");

const PlatRouter = Router()



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


module.exports = PlatRouter;