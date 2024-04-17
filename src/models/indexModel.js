const mongoose = require("mongoose")
const schemaIndex = mongoose.Schema({
    teste: {type: String, required: true},
})

const modelIndex = mongoose.model("IndexModel", schemaIndex)

module.exports = modelIndex