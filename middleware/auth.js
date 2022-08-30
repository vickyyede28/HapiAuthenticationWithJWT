// const { decode } = require("jsonwebtoken")
const { ObjectId } = require("mongodb")
const db = require("../mongodb/db")

const ValidateJWT = () =>{
    return async(decode,request,h) =>{
        const _id= new ObjectId(decode._id)
        const user  = await db.get().collection("users").find({_id})
        if (!user) return {isValid:false};
        return {isValid:true, Credential:user}
    }
}

module.exports = ValidateJWT