const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize');

const port = 5000
const app = express()

app.use(bodyParser.json({ type: "*/*" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const sequelize = new Sequelize('ProcessModel-SNMP', 'sa', 'password123', {
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
        // Observe the need for this nested `options` field for MSSQL
        options: {
            // Your tedious options here
            useUTC: false,
            dateFirst: 1
        }
    }
});

let x = sequelize.query('execute spTest')


app.get("/test", async(req, res)=>{
    const result = await(x);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})