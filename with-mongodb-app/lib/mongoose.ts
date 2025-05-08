import mongoose from "mongoose"

const connectionToDatabase = async () => {
    try{
        //If the MongoDB URL is, return an error message
        if(!process.env.MONGODB_URI){
            throw new Error("MongoDB URL not defined")
        }
        //Otherwise, connect to the database
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection to database !!")
    } catch(err) {
        //Catch any errors
        console.log(err)
    }
}

export default connectionToDatabase