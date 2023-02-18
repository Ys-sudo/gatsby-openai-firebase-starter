import * as React from "react"
import { useEffect, useState } from "react"
import { navigate } from 'gatsby-link'
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import firebase from "../../config/firebase"
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import './index.css'
import Footer from "../components/footer"
import Typewriter from 'typewriter-effect'
/*import {
  GoogleSignInButton,
  FacebookSignInButton,
} from "../components/Authentication/AuthButtons";*/




const label = { inputProps: { 'aria-label': 'Dark mode' } };


const LoginPage = () => {


  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [userImgUrl, setUserImgUrl] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });


  const explore = () => {
      navigate('/archives')
  }

  const home = () => {
      navigate('/')
  }



  const handleLogin = async (e) => {
    e.preventDefault();
    await Login(form);
  };



  const Login = async ({ email, password }) => {

    signInWithEmailAndPassword( auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        setErrorMessage('error: '+error.code.replace(/auth/gi, "sorry"));
      });
  };

  const onLogin = (loginName, imageUrl) => {
    console.log("Hello " + loginName);
    setName(loginName);
    setUserImgUrl(imageUrl);
  };


  useEffect(() => {
    if (auth.currentUser) {navigate('/')}
    darkMode();
  });

  return(
  <>
    <div className="container-fluid malpals" style={{padding:'10%',paddingTop:'100px',textAlign:'center',display:'grid',justifyContent:'center'}}>
    <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={explore}><span className="small">Explore Q&A's</span></Button>
    <Button color="secondary" variant="outlined" style={{position:'fixed',top:'10px',right:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={home}><span id="log" className="small">ASK AI A QUESTION</span></Button>
    <h1 className="link-danger">OpenAI Q&A</h1>
    <h2 className="link-danger">log in to acess the project...</h2>
    <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString("<span style='color:#9c27b0;font-size:2em;'>who asks not stray...</span>")
            .pauseFor(2500)
            .deleteAll()
            .start();
        }}
        options={{
          autoStart: true,
          loop: true,
        }}
      />
    <span><label>Dark mode</label><Switch {...label} onChange={setdarkMode} defaultChecked color="secondary" /></span>

    <div className="tab-content flexer" id="myTabContent" style={{maxWidth:'500px',justifyContent:'center'}}>
      <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="log-in-tab">

      <div style={{maxWidth:'400px',paddingTop:'10px'}}>
        <h2>Welcome back!</h2>
        <p style={{fontSize:'12px'}}>Log in with e-mail and password</p>
        <br />
        <form onSubmit={handleLogin}>
          <div className="input-group mb-2">
          <TextField
            className="form-control btn-dark"
            type="text"
            color="secondary"
            label="E-mail"
            autoComplete="true"
            id="email"
            variant="outlined"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
  				</div>

          <br />

  				<div className="input-group mb-2">
          <TextField
            type="password"
            label="Password"
            color="secondary"
            id="password"
            autoComplete="current-password"
            className="form-control btn-dark"
            variant="outlined"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
  				</div>
          <br />
          <br />
          <div style={{textAlign:'center'}}>
          <Button variant="outlined" color="secondary" className="btn btn-outline-danger" type="submit">
          Log in
          </Button>
  				<p style={{marginTop:'20px',display:'flex',justifyContent:'center',color:'red'}}>
  	        {errorMessage}
          </p>
          </div>
        </form>


      </div>


      </div>

      {/*<div className="sign-in-buttons" style={{display:'flex',flexWrap:'wrap'}}>
        <GoogleSignInButton onLogin={onLogin} />
        <FacebookSignInButton onLogin={onLogin} />
      </div>*/}
    </div>


















    </div>
    <Footer />

</>
)}

export default LoginPage







function darkMode() {
  var hours = new Date().getHours();
  console.log(hours);
  if(global.localStorage.getItem('theme')===null)
  {
    if(hours>=6 && hours<19)
    {
      global.localStorage.setItem('theme', 'normal');
    }
    else
    {
      global.localStorage.setItem('theme', 'dracula');
    }
  }

  if (global.localStorage.getItem('theme')==='dracula'){
  //document.querySelector("nav").style.backgroundColor = 'black';

  document.querySelector("body").style.backgroundColor = '#111111';

  for (let i=0; i<document.querySelectorAll("h1").length;i++){
    document.querySelectorAll("h1")[i].classList.add('dmode-light');
  }
  for (let i=0; i<document.querySelectorAll("h2").length;i++){
    document.querySelectorAll("h2")[i].classList.add('dmode-light');
  }
  for (let i=0; i<document.querySelectorAll("h3").length;i++){
    document.querySelectorAll("h3")[i].classList.add('dmode-imp');
  }
  for (let i=0; i<document.querySelectorAll("ul").length;i++){
    document.querySelectorAll("ul")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("li").length;i++){
    document.querySelectorAll("li")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("p").length;i++){
    document.querySelectorAll("p")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("label").length;i++){
    document.querySelectorAll("label")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("input").length;i++){
    document.querySelectorAll("input")[i].classList.add('dmode');
  }
/*
  for (let i=0; i<document.querySelectorAll("b").length;i++){
    document.querySelectorAll("b")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("sub").length;i++){
    document.querySelectorAll("sub")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("sup").length;i++){
    document.querySelectorAll("sup")[i].classList.add('dmode');
  }

  for (let i=0; i<document.querySelectorAll("strong").length;i++){
    document.querySelectorAll("strong")[i].classList.add('dmode');
  }
  for (let i=0; i<document.querySelectorAll("small").length;i++){
    document.querySelectorAll("small")[i].classList.add('dmode');
  }
*/


  }
  else {

    document.querySelector("body").style.backgroundColor = 'white';
    //document.getElementById('dark-mode-btn').innerText = 'dark';


    for (let i=0; i<document.querySelectorAll("h1").length;i++){
      document.querySelectorAll("h1")[i].classList.remove('dmode-light');
    }
    for (let i=0; i<document.querySelectorAll("h2").length;i++){
      document.querySelectorAll("h2")[i].classList.remove('dmode-light');
    }
    for (let i=0; i<document.querySelectorAll("h3").length;i++){
      document.querySelectorAll("h3")[i].classList.remove('dmode-imp');
    }
    for (let i=0; i<document.querySelectorAll("ul").length;i++){
      document.querySelectorAll("ul")[i].classList.remove('dmode');
    }
    for (let i=0; i<document.querySelectorAll("li").length;i++){
      document.querySelectorAll("li")[i].classList.remove('dmode');
    }
    for (let i=0; i<document.querySelectorAll("p").length;i++){
      document.querySelectorAll("p")[i].classList.remove('dmode');
    }
    for (let i=0; i<document.querySelectorAll("label").length;i++){
      document.querySelectorAll("label")[i].classList.remove('dmode');
    }
    for (let i=0; i<document.querySelectorAll("input").length;i++){
      document.querySelectorAll("input")[i].classList.remove('dmode');
    }
/*
    for (let i=0; i<document.querySelectorAll("b").length;i++){
    document.querySelectorAll("b")[i].classList.remove('dmode');
  }
  for (let i=0; i<document.querySelectorAll("sub").length;i++){
    document.querySelectorAll("sub")[i].classList.remove('dmode');
  }
  for (let i=0; i<document.querySelectorAll("sup").length;i++){
    document.querySelectorAll("sup")[i].classList.remove('dmode');
  }

  for (let i=0; i<document.querySelectorAll("strong").length;i++){
    document.querySelectorAll("strong")[i].classList.remove('dmode');
  }
  for (let i=0; i<document.querySelectorAll("small").length;i++){
    document.querySelectorAll("small")[i].classList.remove('dmode');
  }
*/



  }

}

function setdarkMode(){
  if ((global.localStorage.getItem('theme')===null) || (global.localStorage.getItem('theme')==='normal')){
    global.localStorage.setItem('theme', 'dracula');
    console.log(global.localStorage.getItem('theme'));
    console.log('is it dark yet?: yes');
    darkMode();

  } else {
    global.localStorage.setItem('theme', 'normal');
    console.log(global.localStorage.getItem('theme'));
    console.log('is it dark yet?: no');
    darkMode();
  }
}
