import * as dotenv from 'dotenv'
dotenv.config()
import express, { Response,Request,NextFunction } from 'express';
import Joi from 'joi';
import bodyParser from 'body-parser';
import UserService from './services/UserService';
const app = express()


app.use(bodyParser.json())
let UserSchema = Joi.object().keys({
    name : Joi.string().required(),
    email: Joi.string().regex(
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
      ).required(),
    dob: Joi.date().required()
})

const validateSchema = (req:Request,res:Response,next:NextFunction) =>{
    try{
        let validate = UserSchema.validate(req.body)
        if(validate.error) return res.json({flag:false,message:validate.error.message})
        next()
    }
    catch(e:any){
        res.json({flag:false,message:e.message})
    }
}


app.post("/users",validateSchema,async(req:Request,res:Response)=>{
    try{
        let {body} = req
 
        let user = await UserService.addUser(body)

        res.json({flag:true,data:user})

    }
    catch(e:any){
        console.log(e.message)
        if(e.message == `Validation error`) return res.json({flag:true,messgae:`email already in used`})

        return res.json({flag:true,messgae:e.message})
    }
})

app.get("/users/:id",async(req:Request,res:Response)=>{
    try{
        let {params} = req
 
        let user = await UserService.findUser(params.id)

        res.json({flag:true,data:user})

    }
    catch(e:any){
        res.json({flag:true,messgae:e.message})
    }
})

app.delete("/users/:id",async(req:Request,res:Response)=>{
    try{
        let {params} = req
 
        let user = await UserService.deleteUser(params.id)

        res.json({flag:true,data:user ? `user removed` : `user not found`})

    }
    catch(e:any){
       res.json({flag:true,messgae:e.message})
    }
})

app.listen(5000,()=>{
    console.log("server start")
})