const mongoose = require("mongoose")
const config = require(`${process.cwd()}/janjy.config.js`)

mongoose.connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected")).catch(err => console.log("❌ Error while connecting to MongoDB:" + err))

module.exports = mongoose;