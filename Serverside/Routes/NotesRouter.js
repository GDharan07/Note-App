const router = require('express').Router();
const notesModal=require('../models/Notesmodal');
const jwt = require('jsonwebtoken');

router.post('/postnewnote',async(req,res)=>{
    const token = req.headers['authorization'];
    if(!token){
        res.json("you can't access without login")
        return;
    }
    const decoded = jwt.verify(token, 'secret');
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const userId = decoded.id;
    const { v4: uuidv4 } = require('uuid');
  
    notesModal.findById(userId).then((user)=>{
        if(user){
            user.notes.push({
                noteid:uuidv4(),
                title:req.body.title,
                content:req.body.content,
                date:formattedDate
            })
            user.save()
            res.json('note pushed successfully');
        }else{
            res.json('user not found')
        }
    })
});

router.get('/getallnotes',async(req,res)=>{
    
    const token = req.headers['authorization'];
    if(!token){
        return res.json("you can't access without login")
    }
    const decoded = jwt.verify(token, 'secret');
    notesModal.findById({
        _id: decoded.id,
      }).then((user) => {
          if (user) {
            res.json(user.notes);
          } else {
            res.send('User not found!');
          }
        }).catch((err) => {
          res.send('error: ' + err);
        });
        
})

router.delete('/deletenotes/:noteid',async(req,res)=>{

    const token = req.headers['authorization'];
    if(!token){
        res.json("you can't access without login")
        return;
    }
    const decoded = jwt.verify(token, 'secret');
    const userID=decoded.id;
    const noteID = req.params.noteid;
    const user = await notesModal.findById(userID);
    const noteIndex=user.notes.findIndex((note)=> note.noteid === noteID);
    
    if(noteIndex === -1){
        res.json("note not found");
    }
    user.notes.splice(noteIndex, 1);
    await user.save();
    res.json('deleted successfully');
})

module.exports=router;