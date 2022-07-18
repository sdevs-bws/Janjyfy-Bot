const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const kickSchema = mongoose.Schema(
  {
    UserID: reqString,
    StaffID: reqString,
    GuildID: reqString,
    Reason: reqString,
  }
)

module.exports = mongoose.model('kicks', kickSchema)