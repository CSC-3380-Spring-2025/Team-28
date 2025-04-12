import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    hobbies: {type: Array},
    schedule: {type: Array}
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User