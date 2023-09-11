import React from 'react';
import {Link} from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [Usererror,setUserErorr]=useState('');
  const [emailError,setEmailError]=useState('');
  const [passwordError,setPasswordError]=useState('');
  const navi = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navi('/display')
      return;
    }
    },[])

  const newRegister=(e)=>{
    e.preventDefault();
    if(!email){
      setEmailError("Email is empty")
      return;
    }
    if(!name){
      setUserErorr("Name is empty")
      return;
    }
    if(!password){
      setPasswordError('Password is empty')
      return;
    }
     

    axios.post('http://localhost:8080/auth/register',{
       email:email,name:name,password:password
    }).then((response)=>{
        const res = response.data;
        if(res === "email already exits") {
            setEmailError("email already exits")
            setUserErorr("")
        } 
        if(res === "user already exits"){
            setUserErorr('username already taken')
            setEmailError("")
        }
        if(res === "user registered successfully"){
            setUserErorr('')
            setEmailError('')
            navi('/login')
        }
    })
  }
  return (
    <div>
    <form class="container mt-5 col-md-3 col-8">
    <h1>Register Now!</h1>
<div class="form-outline mb-4">
  <input type="email" id="form2Example1" class="form-control" onChange={(e)=>{setEmail(e.target.value); setEmailError('')}}/>
  <label class="form-label" for="form2Example1">Email address</label>
  <p class="text-danger">{emailError}</p>
</div>
<div class="form-outline mb-4">
  <input type="text" id="form2Example2" class="form-control" onChange={(e)=>{setName(e.target.value);setUserErorr('')}}/>
  <label class="form-label" for="form2Example2">UserName</label>
  <p class="text-danger">{Usererror}</p>
</div>
<div class="form-outline mb-4">
  <input type="password" id="form2Example3" class="form-control" onChange={(e)=>{setPassword(e.target.value);setPasswordError('')}}/>
  <label class="form-label" for="form2Example3">Password</label>
  <p class="text-danger">{passwordError}</p>
</div>
<button type="button" class="btn btn-primary btn-block mb-4" onClick={newRegister}>Sign up</button>
<div class="text-center">
  <p>Already have account? <Link to="/login">Login</Link></p>
</div>
</form>
</div>
  )
}
export default Register;