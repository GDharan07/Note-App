import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNote() {
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [ titleError,setTitleError]=useState('');
    const [contentError,setContentError]=useState('');
    const navi = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
          navi('/login')
          return;
        }
        },[])

    const addnewnote=(e)=>{
        e.preventDefault();
        if(!title){
          setTitleError('Title is required');
          return;
        }
        if(!content){
          setContentError('Content is required');
          return;
        }
        const token = localStorage.getItem('token')
        axios.post('http://localhost:8080/notes/postnewnote',{
            title,
            content
        },{
            headers:{Authorization:token}
        }).then(()=>navi('/display'))
 }

  return (
    <div>
<form class="container mt-5 col-8 col-lg-3">
    <h4>Add New Note</h4>
  <div class="form-outline mb-4">
    <input type="text" id="form4Example1" class="form-control" onChange={(e)=>{setTitle(e.target.value);setTitleError('')}}/>
    <label class="form-label" for="form4Example1">Title</label>
    <p class="text-danger">{titleError}</p>
  </div>
  <div class="form-outline mb-4">
    <textarea class="form-control" id="form4Example3" rows="4" onChange={(e)=>{setContent(e.target.value);setContentError('')}}></textarea>
    <label class="form-label" for="form4Example3">Content</label>
    <p class="text-danger">{contentError}</p>
  </div>
  <button class="btn btn-primary btn-block mb-4" onClick={addnewnote}>
    Add Note
  </button>
</form>
    </div>
  )
}

export default AddNote