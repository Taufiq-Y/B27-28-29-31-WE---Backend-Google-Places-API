const express = require('express')
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins")

const PORT = process.env.PORT || 5000
const app = express()

dotenv.config()

app.use(express.json())


mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
.then(() => console.log("DB Connected..!"))
.catch(err => console.log(err))

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute)

app.listen(process.env.PORT, () => console.log(`Server is up and listening to the ${PORT}`))
app.get('/', (req, res) => res.send("Hello world"))


