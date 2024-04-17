require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./routes")
const path = require("path")
const helmet = require("helmet")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const csurf = require("csurf")
const { csurfCheckError, csurfMiddleware } = require("./src/middlewares/csurfMiddleware")

const sessionOptions = session({
    secret: "secret",
    store: MongoStore.create({mongoUrl: process.env.CONNECTSTRING}),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 5,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

mongoose.connect(process.env.CONNECTSTRING)
    .then(() => {
        app.emit("ready")
    })
    .catch((err) => {console.log(err)})

app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")
app.use(helmet())
app.use(csurf())
app.use(csurfCheckError)
app.use(csurfMiddleware)
app.use(routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'assets', 'js', 'bundle.js'));
});

app.on("ready", () => {
    app.listen(3000, ()=> {
        console.log("start server")
        console.log("http://localhost:3000")
    })
})
