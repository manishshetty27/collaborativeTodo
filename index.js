const express = require ("express")
require("dotenv").config()
console.log(process.env.MONGO_URL)
const app = express()
app.use(express.json())



port = 3000
app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})