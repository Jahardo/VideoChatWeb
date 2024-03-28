import { NextFunction,Request as ExpressRequest,Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface castomReq extends ExpressRequest {
  user?: {[key:string]:any}
}

export const authMiddleware = (req:castomReq,res:Response,next:NextFunction)=> {
  if(req.method === 'OPTIONS'){
    return next()
  }
  try {
    const token= req.headers.authorization?.split(' ')[1];
    if(!token){
      res.status(401).json({message:'user dont auth'})
    }
    const secretKey = process.env.SECRET_KEY || "testKey"
   const decoted =jwt.verify(token || "",secretKey) as {[key:string]:any};
    req.user = decoted;
    next();
  }catch (e) {
    res.status(401).json({message:'User dont auth'})
  }
}
