import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

function Profile() {
  
   const [notes,setNotes]= useState([]);
   const [name,setName]= useState('');
   const navi = useNavigate();
   
   useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navi('/login')
      return;
    }
    setName(localStorage.getItem('name'))
    fetchNotes();
   },[])
 
   const fetchNotes=()=>{
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/notes/getallnotes',{
    headers:{Authorization:token}
    }).then((response)=>{
      setNotes(response.data)
    }) 
   }

   const deletee=(noteid)=>{
    const token = localStorage.getItem('token');
     axios.delete(`http://localhost:8080/notes/deletenotes/${noteid}`,{
     headers:{Authorization:token}
     }).then(()=>{
       fetchNotes()
     })
   }
return (
<div class="container-fluid mt-5">
   <div class="text-start d-flex">
      <button class="btn btn-primary" onClick={()=>navi('/addnote')}>Add Note</button><p class="ml-auto">User : {name}</p>
   </div>
   <div>
   <div class="tab-content bg-transparent">
        <div id="note-full-container" class="note-has-grid row">
        {notes.length === 0 ? (<div>Start Creating Your Notes</div>) : (notes.map((value,index)=>
            <div class="col-md-4 single-note-item all-category mt-3" key={index} >
                <div class="card card-body">
                    <span class="side-stick"></span>
                    <h5 class="note-title text-truncate w-75 mb-0" data-noteheading="Book a Ticket for Movie">{value.title}<i class="point fa fa-circle ml-1 font-10"></i></h5>
                    <p class="note-date font-12 text-muted">{value.date}</p>
                    <div class="note-content">
                        <p class="note-inner-content text-muted" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{value.content}.</p>
                    </div>
                    <button class="btn btn-primary col-3 col-lg-3" onClick={()=>deletee(value.noteid)}>Delete</button>
                </div>
            </div>)
            )}
         </div>
      </div>
  </div>
</div>
  )
}

export default Profile