import express from "express";
import mongoose from "./db/index.js";

const app = express()
app.use(express.json())

mongoose.connection.on("open", () => {
    console.log("DB connected");
})

mongoose.connection.on("error", (err) => {
    console.log("DB error occured" , err);
})


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