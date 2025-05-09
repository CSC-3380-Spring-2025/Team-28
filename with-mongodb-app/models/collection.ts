import mongoose from "mongoose"

const collectionSchema = new mongoose.Schema({
    imageURL: {type: String, required: true},
    dateAdded: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    email: {type: String, required: true},
    hobby: {type: String, required: true}
})

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema)
export default Collection