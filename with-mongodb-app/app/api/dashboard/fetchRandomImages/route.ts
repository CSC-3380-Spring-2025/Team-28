import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        await connectionToDatabase()
        const colExist = await Collection.findOne({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER})
        let fetchRandCol
        if(colExist){
            fetchRandCol = await Collection.aggregate([{ $match: { email: process.env.NEXT_PUBLIC_LOGGED_IN_USER } },
                { $sample: { size: 3 } }])
        }
        console.log(fetchRandCol)
        return NextResponse.json({error: "random images picked for user", status: 201, images: fetchRandCol})
    } catch(err) {
        console.log(err)
    }
}