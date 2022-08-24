const { options } = require("joi")
const Joi = require("joi")
const companycontroller = require("../controller/usercontroller")

const routes = [
    {
        method:"POST",
        path:"/insertcompany",
        handler: companycontroller.createcompany,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required(),
                    owner:Joi.string().required(),
                    employees:Joi.number().required(),
                    Ctype:Joi.string().required()
                }),
                failAction: (request,h,error)=>{
                    return h.response({message:error.details[0].message})
                }
            }
        }
    },

    {
        method:"get",
        path:"/",
        handler:companycontroller.findcompany
    },

    {
        method:"PATCH",
        path:"/updatecompany/{id}",
        handler:companycontroller.updatecompany,
        options:{
            validate:{ 
                payload:Joi.object({
                    name:Joi.string().required(),
                    owner:Joi.string().required(),
                    employees:Joi.number().required(),
                    Ctype:Joi.string().required()
                }),
                params:Joi.object({
                    id:Joi.string().required()
                })
            }
        }
    },
    {
        method:"DELETE",
        path:"/deletecompany/{id}",
        handler:companycontroller.deletecompany,
        options:{
            validate:{
                params:Joi.object({
                    id:Joi.string().required()
                })
            }
        }
    },
    {
        method:"post",
        path:"/register",
        handler:companycontroller.createuser,
        options:{
            validate:{
                payload:Joi.object({
                    name:Joi.string().required(),
                    email:Joi.string().required().email(),
                    password:Joi.string().required(),
                    confirmpassword:Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
                }
            }
        }
    },
    {
        method:"post",
        path:"/login",
        handler:companycontroller.loginuser,
        options:{
            validate:{
                payload:Joi.object({
                    email:Joi.string().email(),
                    password:Joi.string()
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
                }
            }
        }
    }

]

module.exports = routes
