const mongoose = require('mongoose')

const userVerificationSchema = new mongoose.Schema(
    {
        userID:{type:String},
        stringUnique:{type:String},
        createdAt:{type:Date},
        expiredAt:{type:Date}
    },
    {collection:'verify'}
)

module.exports = mongoose.model('userVerification', userVerificationSchema)