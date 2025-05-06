import mongoose from "mongoose"

const connectionToDatabase = async () => {
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("MongoDB URL not defined")
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection to database !!")
    } catch(err) {
        console.log(err)
    }
}

export default connectionToDatabase