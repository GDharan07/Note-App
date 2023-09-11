const express = require('express');
const app = express();
const userRouter = require('./Routes/UserRouter');
const notesRouter = require('./Routes/NotesRouter');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notescollectionapp').then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err)
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/auth',userRouter);
app.use('/notes',notesRouter)

app.listen(8080,()=> console.log('server started'));