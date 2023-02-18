import React from 'react'
import { useEffect } from "react";
import { navigate } from 'gatsby-link'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import './index.css'
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import Typewriter from 'typewriter-effect';
import Footer from "../components/footer"

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





const label = { inputProps: { 'aria-label': 'Dark Mode' } };



const AboutPage = () => {

  useEffect(() => {
        darkMode();
      });


  return(
  <>
  <div style={{width:'90%',padding:'10% 5%',minHeight:'600px'}}>
  <Button color="secondary" variant="outlined" style={{position:'fixed',top:'10px',right:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={logout}><span id="log" className="small">Log out</span></Button>
  <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={askAi}><span className="small">ASK AI A QUESTION</span></Button>
  <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline',justifyContent:'space-between'}}>
  <h1 style={{fontSize:'3em'}}>About the OpenAI Q&A project</h1>
  <span><label>Dark mode</label><Switch {...label} onChange={setdarkMode} defaultChecked color="secondary" /></span>
  </div>
  <h2>Learn about the project.</h2>
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
  <p><a href="https://openai.com/api/pricing" style={{color:'red'}} target="_blank" rel="noopener noreferrer">Every request to the OpenAI model API costs real money</a>, so does the requests made to the <a href="https://firebase.google.com/pricing" style={{color:'red'}} target="_blank" rel="noopener noreferrer">firebase database</a>, because of that the access is restricted only for authorised personel. Everyone is welcome to browse the archives. But if the project generates traffic the database and requests will be quite expensive so every kind of donation is appriciated.</p>
  <p>We are looking forward to developing the project and making it even more awesome. The project is open-source and available on github for cloning as a starter template for free for everyone.</p>
  <p><b>How to use the project?</b></p>
  <p>Feel free to browse the Q&A archives, this will be free forever for everyone as sample use-cases. For now only authorised members can use the project to ask questions as we are trying to estimate the costs of maintaining it, please <a style={{color:'red'}} href="/early-access">contact us</a> if you would like to join us in this <b>great quest of making AI accesible for everyone at low cost</b>.</p>
  </div>




  </div>
  <Footer />


  </>)


}

export default AboutPage

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
