import mongoose from "mongoose"

const hobbySchema = new mongoose.Schema({
    hobby: {type: String, required: true},
    tracker: {type: String, required: true}
})

const Hobby = mongoose.models.Hobby || mongoose.model("Hobby", hobbySchema)
export default Hobby