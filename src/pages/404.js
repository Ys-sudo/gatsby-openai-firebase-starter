import React from 'react'
import { useEffect } from "react";
import { navigate } from 'gatsby-link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Footer from "../components/footer"
import Typewriter from 'typewriter-effect';
import './index.css'
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";



const label = { inputProps: { 'aria-label': 'Dark Mode' } };
const explore = () => {
    navigate('/archives')
}
const logout = () => {

if (auth.currentUser) {
  signOut(auth)
    .then(() => {
      navigate('/login')
    })
    .catch((error) => {
      console.error(error);
    });

  } else {
    navigate('/login')
  }
}

const askAi = () => {
    navigate('/')
}
const ErrorPage = () => {
  useEffect(() => {
        darkMode();
      })
  return(
  <>
  <div style={{width:'90%',padding:'10% 5%',minHeight:'600px'}}>
  <Button color="secondary" variant="outlined" style={{position:'fixed',top:'10px',right:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={logout}><span id="log" className="small">Log out</span></Button>
  <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={askAi}><span className="small">ASK AI A QUESTION</span></Button>
  <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline',justifyContent:'space-between'}}>
  <h1 style={{fontSize:'3em'}}>404 error </h1>
  <span><label>Dark mode</label><Switch {...label} onChange={setdarkMode} defaultChecked color="secondary" /></span>
  </div>
  <h2>OpenAI - Q&A : page not found...</h2>
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
  <div>
  <p>You just landed in blank space...</p>
  <p>That sadness... well, never mind, it's time to go on.</p>
  <br />
  <div style={{display:'flex',justifyContent:'center'}}>
  <Button color="secondary" variant="contained" style={{marginLeft:'10px',marginRight:'10px'}} onClick={explore}><span id="archives" className="small">Q&A Archives</span></Button>
  </div>
  </div>



  </div>
  <Footer />


  </>)

}

export default ErrorPage

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

  for (let i=0; i<document.querySelectorAll("pre").length;i++){
    document.querySelectorAll("pre")[i].classList.add('dmode');
  }

/*
for (let i=0; i<document.querySelectorAll("input").length;i++){
  document.querySelectorAll("input")[i].classList.add('dmode');
}
for (let i=0; i<document.querySelectorAll("label").length;i++){
  document.querySelectorAll("label")[i].classList.add('dmode');
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

    for (let i=0; i<document.querySelectorAll("pre").length;i++){
    document.querySelectorAll("pre")[i].classList.remove('dmode');
  }

  /*
  for (let i=0; i<document.querySelectorAll("input").length;i++){
    document.querySelectorAll("input")[i].classList.remove('dmode');
  }
  for (let i=0; i<document.querySelectorAll("label").length;i++){
    document.querySelectorAll("label")[i].classList.remove('dmode');
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
