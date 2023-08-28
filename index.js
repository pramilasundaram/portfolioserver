const express=require("express")

const dotenv=require('dotenv').config();
const cors=require('cors')
const bodyParser=require('body-parser');
const nodemailer = require("nodemailer");


const app=express();
const PORT=process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.json({message:"Portfolio server"})
    })
    
app.post("/sendemail",async (req,res) => {
    const {name,email, subject, message}=req.body
    console.log(req.body)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',            
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from:email,
            to:'pramilaworld@gmail.com',
            subject: subject,
            html:`<div><h4 class="text-center mb-4">sample mail</h4>                  
                  <p>Hi , I am ${name}</p>
                  <p>${message}</p>
                  </div>`,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
})


app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
    })