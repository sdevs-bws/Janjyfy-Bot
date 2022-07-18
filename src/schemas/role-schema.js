const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const roleSchema = mongoose.Schema(
  {
    RoleID: reqString,
    GuildID: reqString,
  }
)

module.exports = mongoose.model('muted-role', roleSchema)