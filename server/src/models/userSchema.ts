import {Schema} from 'mongoose'
export const userSchema = new Schema({
    name:{type:String,trim:true,required:true, minLength:3, maxLength:128,unique:true},
    email:{type:String,
        trim:true
        ,required:true
        ,unique:true,
        validate:{
            validator:(v:string)=>{
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            }},
        message: (props:string) => {`${props} is not valid email`}
    },
    password:{type:String,trim:true,required:true,minLength:6,},
    createdAt:{
        type:Date,default:Date.now
    },
    img: {type:String,requred:true,default:"default.jpg"}
})