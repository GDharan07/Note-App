const router=require('express').Router();
const userModal = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const notesModal = require('../models/Notesmodal');

router.post('/register',async (req,res)=>{
    
    const {email,name,password}=req.body;
    const userName = await userModal.findOne({name});
    const userEmail = await userModal.findOne({email});
    
    if(userEmail){
      return res.json("email already exits");
    }
    if(userName){
      return res.json("user already exits")
    }
    
    const hashPassword= await bcrypt.hash(password,10)
    const data= await new userModal({email,name,password:hashPassword})
    await data.save()
    const data2= await new notesModal({_id:data._id,username:data.name})
    await data2.save();
    res.json("user registered successfully")
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const user = await userModal.findOne({email})
    if(!user){
        return res.json("User not Found")
    }
    const validPassword = await bcrypt.compareSync(password,user.password);
    if(!validPassword){
        return res.json("Mismatch Password");
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id,name:user.name});
    
})

module.exports=router;

 