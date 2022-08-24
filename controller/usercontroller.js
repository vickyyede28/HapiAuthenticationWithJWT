const db = require("../mongodb/db")
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt")
const jwt  =require("jsonwebtoken")

const createcompany  = async(req,h) =>{
    try {
        await db.get().collection("company").insertOne(req.payload);
        return({Success:"Company Added Successfully!!!"});
    } catch (error) {
        console.log({error:error.message});
    }
}

const findcompany = async(request,h)=>{
    try {
    return await db.get().collection("company").find().toArray()
    } catch (error) {
        console.log({error:error.message});
    }
}

const updatecompany = async(request,h)=>{
    try {
        const _id = new ObjectId(request.params.id)
        await db.get().collection("company").updateOne({_id},{$set:request.payload})
        return h.response({success:"Company updated successfully"})
    } catch (error) {
        console.log({error:error.message});
    }
}

const deletecompany = async(request,h)=>{
    try {
        const _id = new ObjectId(request.params.id)
        await db.get().collection("company").deleteOne({_id})
        return h.response({success:"Company deleted successfully"})
    } catch (error) {
        console.log({error:error.message});
    }
}

const createuser = async(request,h)=>{
    try {
        const {name, email, password, confirmpassword} = request.payload
        if(password!==confirmpassword){
            return h.response({error:"Password and ConfirmPassword is not Valid!"})
        } else {
            const user = await db.get().collection("users").findOne({email});
            if(user) return h.response({error:"User Already exists!"})
            const hashPassword = await bcrypt.hash(password,10);
            await db.get().collection("users").insertOne({name,email,password:hashPassword});
            return h.response({success:"User Created Successfully!"})
        }
    } catch (error) {
        console.log({error:error.message});
    }
}

const loginuser =async(request,h)=>{
    try {
        const {email,password} = request.payload;
        const user = await db.get().collection("users").findOne({email});
        if(!user) return h.response({error:"users is not register"})
        const data  = await bcrypt.compare(password,user.password);
        if(!data) return h.response({error:"Credential is Invalid"})
        return h.response({success:"User Login Successfully!!!"})

    } catch (error) {
        console.log({error:error.message});
    }
}

module.exports = {
    createcompany,
    findcompany,
    updatecompany,
    deletecompany,
    createuser,
    loginuser
}