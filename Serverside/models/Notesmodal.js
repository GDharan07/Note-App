const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
   username:{
     type:String,
     required:true
       },
      notes:[
         ]
})


module.exports=mongoose.model('notesModal',notesSchema);

