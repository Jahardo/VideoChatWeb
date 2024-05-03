import {ApiError} from "../error/ApiError.js";
import {userModel} from "../models/index.js";
import {Request,Response,NextFunction} from "express";
import path from 'path'
import {v4} from 'uuid';
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config'
import { Request as ExpressRequest } from "express";
import { UploadedFile } from "express-fileupload";

interface CustomRequest extends ExpressRequest {
    user?: { name: string, email: string }; 
}

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
  }

const generateJwt = (name:string,email:string)=> {
    const key = process.env.SECRET_KEY || "testKey"
    return  jwt.sign(
        {name,email},
        key,
        //process.env.SECRET_KEY,
        {expiresIn:'24h'})
}

const isExistWithEmail = async (email:string,next:NextFunction)=> {
    const candidate =  await userModel.findOne({email})
    if(candidate){
        return next(ApiError.BadRequest(`user with email - ${email} already exist`))
    }
}

const isExistWithUserName = async (name:string,next:NextFunction)=> {
    const candidate =  await userModel.findOne({name})
    if(candidate){
        return next(ApiError.BadRequest(`user with name - ${name} already exist`))
    }
}

export class userController {
    async registration(req:Request,res:Response,next:NextFunction){
        if(!req.body) {
            return next(ApiError.BadRequest('body is empty'))
        }
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return next(ApiError.BadRequest('name or email or password is empty'))
        }
        let candidate =  await userModel.findOne({name})
        if(candidate){
            return next(ApiError.BadRequest(`user with name - ${name} already exist`))
        }
        candidate =  await userModel.findOne({email})
        if(candidate){
            return next(ApiError.BadRequest(`user with email - ${email} already exist`))
        }
        const hashPassword =  await bcrypt.hash(password,4)
        const user= new userModel({name,email,password:hashPassword})
        try {
            await user.save()
        }catch (e:any){
            return next(ApiError.BadRequest(`${e.name}  ${e.message}`));
        }
        const token = generateJwt(user.name,user.email)
        return res.json({ token ,reqBody:req.body,ps:hashPassword});
    }
    async login(req:Request, res:Response,next:NextFunction){
      const {email,password} = req.body;
      const user = await userModel.findOne({email});
      if(! user){
        return next(ApiError.Internal('userName or email not exist'))
      }
      let comparePassword = bcrypt.compareSync(password,user.password);
      if(!comparePassword){
        return next(ApiError.Internal('password is wrong'))
      }
      const token = generateJwt(user.name,user.email)
      return res.json({token:token})
    }
    async changeImg(req:Request ,res:Response,next:NextFunction){
        //& {files: MulterFile[]}
        const files= req.files;
        if(!files){
            return next(ApiError.BadRequest('File dont exist'))
        }
        let fileName = v4()+ '.jpg';
        const img = files['img'] as UploadedFile;
        img.mv(path.resolve('static',fileName));
        return res.json({ms:'gggg'})
    }
    async check(req:CustomRequest,res:Response,next:NextFunction){
      const token = generateJwt(req.user?.name|| "",req.user?.email || "")
      return res.json({token})
    }
    async test(req:Request,res:Response){
        console.log(req.query)
        console.log(req.body)
        const token = generateJwt('adsds','fddce')
        return res.json({ token });
    }
}
