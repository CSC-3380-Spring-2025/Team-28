import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    content: {type: String, required: true},
    email: {type: String, required: true},
    hobby: {type: String, required: true}
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
export default Blog