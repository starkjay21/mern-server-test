const express = require('express')
const app = express()
const mongoose = require('mongoose').default
const UserModel = require('./models/Users')
const cors = require('cors')
require("dotenv").config()
app.use(express.json())
app.use(cors())

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(
    MONGODB_URI
)

app.post("/addUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save().then((request) =>{
        res.json(user)
    }).catch((err) =>{
        res.json(err)
    })
})

app.get("/getUsers", async (req, res) => {
    await UserModel.find({}).then((request) => {
        res.json(request)
    }).catch((err) => {
        res.json(err)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is up and running at PORT ${process.env.PORT}`)
})