import express, { Router } from "express";
import mongoose from "./db/index.js";
import User from "./model/index.js";
import bcrypt from "bcrypt"
import helmet from "helmet";
import cors from "cors"
import router from "./routes/index.js";

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use("api", router)

mongoose.connection.on("open", () => {
    console.log("DB connected");
})

mongoose.connection.on("error", (err) => {
    console.log("DB error occured" , err);
})


const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.send({ status: 200, message: "User data received successfully", user: users })

    } catch (err) {
        res.status(500).send({ error: err })
    }
}
app.get("/" , getUser)

const createUser = async (req, res) => {
    try {
        console.log(req.body.password)
        const password = bcrypt.hashSync(req.body.password, 10);
        console.log(password, "password")
        const user = await User.create({
            ...req.body,
            password
        })
        const data = user.toObject();
        console.log(data.password, "data.password" )
        delete data.password
        res.send({ status: 200, message: "User created successfully", user: data})

    } catch (err) {
        res.status(500).send({ error: err })
    }
}

app.post("/post", createUser)

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(user) {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if(checkPassword) {
                res.send({ status: 200, message: "User logged in succesfully", id: user})
            } else {
                res.send({ status: 401, message: "Incorrect password" })
            }
        } else {
            res.status(404).send({ error: "User not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err })
    }
}

app.post("/login", loginUser)


// let data = []

// app.get("/", (req, res) => {
//     res.send(data)
//     res.status(200)
// })

// app.post("/data", (req, res) => {
//     console.log(req.body[0]);
//     data.push(req.body[0])
//     res.send({ user: req.body[0], message: "user successfully added" })
// })

// app.delete("/data-delete", (req, res) => {
//     console.log("deleted successfully")
// })

// app.put("/edit-data", (req, res) => {

// })

app.listen(3000, () => {
    console.log("testing");
})