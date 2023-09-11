import React from 'react'
import {Link} from 'react-router-dom';
import '../Styles/Login.css';
import { useState,useEffect} from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');    
    const [cookie,setCookie]=useCookies(['access_token']);
    const [error,setError]=useState('');
    const [emailError,setEmailError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const navi = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        navi('/display')
        return;
      }
      },[])

    const login=(e)=>{
     e.preventDefault();
     if(!email){
      setEmailError("Email is empty!")
      return;
     }
     if(!password){
      setPasswordError("Password is empty!")
      return;
     }

     axios.post("http://localhost:8080/auth/login",{
        email,password
     }).then((response)=>{
      const res=response.data;
      if(res === "User not Found"){
          setError('Missmatch UserName/Password!')
         }
      if(res === "Mismatch Password"){
          setError('Missmatch UserName/Password!')
         }
      if(res.token){
         setCookie('access_token',res.token)
         localStorage.setItem("UserTD",res.userID)
         localStorage.setItem("token",res.token)
         localStorage.setItem("name",res.name)
         setIsAuthenticated(true);
         navi('/display')
      }
     })
}






return (
    <form class="container container-expand-lg mt-5 col-md-3 col-8">
        <h1>Login Here!</h1>
    <div class="form-outline mb-4">
      <input type="email" id="form2Example1" class="form-control" onChange={(e)=>{setEmail(e.target.value);setError('');setEmailError('')}}/>
      <label class="form-label" for="form2Example1">Email address</label>
      <p class="text-danger align-center">{emailError}</p>
    </div>
    <div class="form-outline mb-4">
      <input type="password" id="form2Example2" class="form-control" onChange={(e)=>{setPassword(e.target.value); setError('');setPasswordError('')}}/>
      <label class="form-label" for="form2Example2">Password</label>
      <p class="text-danger align-center">{passwordError}</p>
    </div>
    <p class="text-danger align-center">{error}</p>
    <button type="button" class="btn btn-primary btn-block mb-4" onClick={login}>Sign in</button>
    <div class="text-center">
      <p>Not a member? <Link to="/register">Register</Link></p>
    </div>
  </form>
  )
}
