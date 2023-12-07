const express = require('express')
const app = express()
app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('get!')
})


app.post('/', (req, res) => {
    console.log("Just got a request!")
    res.send('post!')
})
app.listen(process.env.PORT || 3000)