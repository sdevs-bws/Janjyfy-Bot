const mongoose = require("mongoose")

const schema = mongoose.Schema({

    GuildID: String,
    AcceptedCategory: String,
    DeclinedCategory: String,
    ApplicationCategory: String,
    AcceptRole: String,
    Questions: {
        type: Array,
        default: []
    }

})

module.exports = mongoose.model("Application", schema, "Application")