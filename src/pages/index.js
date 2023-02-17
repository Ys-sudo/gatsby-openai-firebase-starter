import React from 'react'
import { useEffect, useState } from "react";
import { navigate } from 'gatsby-link'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './index.css'
import { auth } from "../../config/firebase";
import Firebase from "../../config/firebase";
import { signOut } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";
import Footer from "../components/footer"

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

const explore = () => {
    navigate('/archives')
}

//downloading json files

export function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


function downloadQa(){
console.log(document.getElementById('response').innerText.replace(/\n/g,' '))
if (auth.currentUser && document.getElementById('response').innerText!== '') {
download(document.getElementById('response').innerText.replace(/\n/g,' '), 'openai-q-a.json', 'text/json')
} else if (!auth.currentUser){navigate("/login/")} else {
  alert('Empty answers. Process some questions first please.')
}
}

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

function runQuery(){
  if (!auth.currentUser) {
    navigate("/login/");
  } else if (document.getElementById('question').value.length >= 10) {
document.getElementById('hidden-answers').style.display = 'block'
let response
  let prompt = document.getElementById('question').value
  let temp = document.getElementById('temperature').value
  let maxTokens = document.getElementById('max-tokens').value
  document.getElementById('loading-indicator').style.display = 'flex'
    response = openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: Number(temp),
      max_tokens: Number(maxTokens),
    }).then(response => {
      console.log(response.data.choices[0].text)
      let answer = document.createElement("pre")
      let archivalq = document.createElement("p")
      let separator = document.createElement("hr")
      archivalq.style.fontFamily = 'Courier new'
      answer.style.fontFamily = 'Courier new'
      answer.innerHTML = response.data.choices[0].text
      archivalq.innerHTML = '<b>Q:</b>' + document.getElementById('question').value;
      document.getElementById('response').appendChild(archivalq)
      document.getElementById('response').appendChild(answer)
      document.getElementById('response').appendChild(separator)
      document.getElementById('loading-indicator').style.display = 'none'
      GetData(response.data.choices[0].text)
      });
    } else {
      alert('Please enter minimum 10 characters.')
    }
}

const label = { inputProps: { 'aria-label': 'Dark mode' } };

export default function Home() {
  useEffect(() => {
    if (!auth.currentUser) {document.getElementById('log').innerText = 'Log in'}
    darkMode()
  });
  return(
  <>
  <div style={{width:'90%',padding:'10% 5%',minHeight:'600px'}}>
  <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={explore}><span className="small">Q&A archives</span></Button>
  <Button color="secondary" variant="outlined" style={{position:'fixed',top:'10px',right:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={logout}><span id="log" className="small">Log out</span></Button>
  <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline',justifyContent:'space-between'}}>
  <h1 style={{fontSize:'3em'}}>OpenAI - Q&A</h1>
  <span><label>Dark mode</label><Switch {...label} onChange={setdarkMode} defaultChecked color="secondary" /></span>
  </div>
  <h2>Welcome to the OpenAI Q&A project.</h2>
  <div>
  <p>Type any questions you have, to be processed and answered by the
  text-davinci-003 model developed and maintained by the OpenAI organization. The questions and answers will be uploaded to the cloud database then returned on the <a className="secondary" href="/archives">archives page</a>.</p>
  <br />
  <ul>
  <li>Ask the question in the input field.</li>
  <li>Specify the randomness (0 - 1) and the maximum output length (50 - 500). </li>
  <li>Then click the ASK button to get the answer.</li>
  </ul>
  </div>
  <Card sx={{ minWidth: '95%',marginTop:'50px',padding:'2.5%' }}>
  <CardContent>
  <h3 style={{color:'#111'}}>Ask your question:</h3>
  <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
    <TextField autoComplete="true" color="secondary" id="question" style={{width:'82%',marginTop:'25px',marginRight:'2%'}} onChange={(e)=>{console.log(e.target.value)}} label="Q: Write a sentence of text about painting in the 21st century..." placeholder="Q: Write a sentence of text about painting in the 21st century..." variant="outlined" />
    <Button color="secondary" style={{minWidth:'13%',marginTop:'25px'}} variant="outlined" onClick={runQuery}>Ask Question</Button>
  </div>
  <br />
  <span>^ Edit the question above, then click the button to process the question.</span>
  <br />
  <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>
  <TextField color="secondary" id="temperature" onChange={(e)=>{console.log(e.target.value)}} style={{marginTop:'25px',marginRight:'2%',minWidth:'200px'}} label="Randomness (0-1)" type="number" InputProps={{ inputProps: { min: 0, max: 1, step: 0.1 } }} defaultValue="0" placeholder="0" variant="outlined" />
  <TextField color="secondary" id="max-tokens" onChange={(e)=>{console.log(e.target.value)}} style={{marginTop:'25px',marginRight:'2%',minWidth:'200px'}} label="Maximum length (50 - 500)" InputProps={{ inputProps: { min: 50, max: 500 } }} defaultValue="150" placeholder="50" type="number" variant="outlined" />
  </div>
  <br />
  </CardContent>
  </Card>
  <div id="hidden-answers" style={{display:'none'}}>
  <h2 style={{textDecoration:'underline'}}>Your <b>questions & answers</b>:</h2>
    <div style={{display:'flex',flexWrap:'wrap'}}>
    <Card sx={{ minWidth: '100%' }}>
      <CardContent color="secondary">
      <div id="response" style={{fontSize:'17px',fontFamily:'Roboto',width:'100%'}}>
      <Box id="loading-indicator" sx={{ display: 'none',width:'100%',minHeight:'100px',zIndex:'1000',position:'relative',alignItems:'center',justifyContent:'center' }}>
      <br />
       <CircularProgress color="secondary" />
      <br />
      </Box>
      </div>
      </CardContent>
      </Card>
      <div style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'50px'}}>
      <Button color="secondary" style={{width:'200px'}} variant="contained" onClick={downloadQa}>Download Q&A's</Button>
      </div>
    </div>
  </div>
  </div>
  <Footer />


  </>)
}



const GetData = (response) => {

  if (!auth.currentUser) {
    navigate("/login");
  } else {

  if (document.getElementById('question').value.length >= 10){

    // Upload json object
    let day = new Date()
    let ms = Date.now()
    let que = JSON.stringify(document.getElementById('question').value)
    let answer = JSON.stringify(response.replace(/\n/g,' '))
    console.log(que)
   Firebase.database()
     .ref("QA/" + que)
     .set(
       {
         question: que,
         answer: answer,
         time: ms,
         date: day.toLocaleDateString(),
       },
       (error) => {
         if (error) {
           console.log(error.message);
         }
       }
     )
}
}
}










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

/*
for (let i=0; i<document.querySelectorAll("label").length;i++){
  document.querySelectorAll("label")[i].classList.add('dmode');
}
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

/*
for (let i=0; i<document.querySelectorAll("label").length;i++){
  document.querySelectorAll("label")[i].classList.remove('dmode');
}
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
