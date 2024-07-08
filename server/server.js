const express = require('express')
const app = express()

app.get("/api", (req, res) =>{
    res.json({ "users": ["usu1", "usu2", "usu3"] })
})

app.listen(5000, () =>{ console.log("server rodando") })