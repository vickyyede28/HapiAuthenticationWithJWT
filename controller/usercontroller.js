const db = require("../mongodb/db")
const {ObjectId} = require("mongodb");
const { date } = require("joi");

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

module.exports = {
    createcompany,
    findcompany,
    updatecompany,
    deletecompany
}