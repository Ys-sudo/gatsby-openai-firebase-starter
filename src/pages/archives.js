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
import Footer from "../components/footer"
import Typewriter from 'typewriter-effect';
import {
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import './index.css'
import { auth } from "../../config/firebase";
import Firebase from "../../config/firebase";
import { signOut } from "firebase/auth";
import { getDatabase, ref, update, onValue } from "firebase/database";

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

function removeDuplicates(arr) {
     return arr.filter((item,
         index) => arr.indexOf(item) === index);
 }




const label = { inputProps: { 'aria-label': 'Dark Mode' } };

export default function Home() {
  {/*useEffect(() => {
    if (!auth.currentUser) {document.getElementById('log').innerText = 'Log in'}

  });*/}
let [timers, setTimers] = React.useState([]);
const [time, setTime] = React.useState("");
useEffect(() => {

    const db = getDatabase();
    const recipesRef = ref(db, 'QA/');
    onValue(recipesRef, (snapshot) => {

      const data = snapshot.val();
      //console.log(data);

      const objects = Object.entries(data);

      //console.log(objects)
      let datas = document.getElementById('render');

      for(let i = 0;i<objects.length;i++){

      let container = document.createElement("div");
      let rimg = document.createElement("div");
      let wrapper = document.createElement("div");
      let desc = document.createElement("div");

      let rname = document.createElement("p");
      let rtime = document.createElement("p");

      let how = document.createElement("p");
      let make = document.createElement("pre");

      let ings = document.createElement("p");
      let list = document.createElement("ul");


    //  container.classList.add('recipe',objects[i][1].question.replace(/ /g,'-').toLowerCase(),objects[i][1].time.replace(/\\/g,'0'),objects[i][1].level.toLowerCase());

      rimg.addEventListener('click',function() {
        this.parentNode.childNodes[1].classList.add('visible');
      })


      rimg.classList.add('rimage');
      wrapper.classList.add('flexwrapper');
      desc.classList.add('desc');
      rname.classList.add('styled');
      rtime.classList.add('styled');

      rname.innerHTML = '<b>Question:</b>&nbsp;'+objects[i][1].question;
      rtime.innerHTML = ' |&nbsp;<b class="rtime">'+objects[i][1].date.replace(/\/$/g,'.')+'</b>&nbsp;🕓';

      how.innerHTML = '<b>Answer:</b>';
      make.innerText = objects[i][1].answer;

      wrapper.appendChild(rname);
      wrapper.appendChild(rtime);
      rimg.appendChild(wrapper);

      desc.appendChild(ings);
      desc.appendChild(list);

      desc.appendChild(how);
      desc.appendChild(make);
      //desc.appendChild(button);
      container.classList.add('recipe',objects[i][1].question.replace(/ /g,'-').toLowerCase(),objects[i][1].date.replace(/\\/g,'0'));

      container.appendChild(rimg);
      container.appendChild(desc);

      if (datas !== null && datas !== undefined){
      datas.appendChild(container);
      darkMode();
      }

      setTimers((timers) => [...timers, objects[i][1].date.replace(/\/$/g,'.')])


      }


    })



  }, []);
  return(
  <>
  <div style={{width:'90%',padding:'10% 5%',minHeight:'600px'}}>
  <Button color="secondary" variant="outlined" style={{position:'fixed',top:'10px',right:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={logout}><span id="log" className="small">Log out</span></Button>
  <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={askAi}><span className="small">ASK AI A QUESTION</span></Button>
  <div style={{display:'flex',flexWrap:'wrap',alignItems:'baseline',justifyContent:'space-between'}}>
  <h1 style={{fontSize:'3em'}}>OpenAI - Q&A</h1>
  <span><label>Dark mode</label><Switch {...label} onChange={setdarkMode} defaultChecked color="secondary" /></span>
  </div>
  <h2>Welcome to the OpenAI Q&A archives.</h2>
  <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString("<span style='color:#9c27b0;font-size:2em;'>who asks and search goes further ahead...</span>")
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
  <p>Here you can find questions typed by the users and answers generated by the AI.</p>
  <ul>
  <li>Type in the search field to filter questions.</li>
  <li>Filter by date.</li>
  </ul>
  </div>



  <Card sx={{ minWidth: '95%',marginTop:'25px',marginBottom:'25px',padding:'1% 2.5%' }}>
  <CardContent>
  <h3 style={{color:'#111'}}>Search & filter questions:</h3>
    <div
      id="ui"
      style={{
        width: "100%",
        textAlign: "center",
        display: 'flex',
        flexWrap:'wrap',
        alignItems:'baseline',
        justifyContent:'center'
      }}
    >
      <TextField
        style={{ minWidth: "75%",marginRight:'5%', textAlign: "center",marginTop:'2%' }}
        type="text"
        color="secondary"
        variant="standard"
        autoComplete="true"
        label="Search a question..."
        placeholder="Search a question..."
        id="search"
        onChange={handleSearch}
      />
      <br />
      <br />
      <div
        className="flexwrapper"
      >

        <div className="flexwrapper-no-width" style={{marginTop:'2%'}}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel color="secondary" id="time">Date</InputLabel>
          <Select
            id="time"
            value={time}
            labelId="time"
            label="Time"
            color="secondary"
            onChange={handleTimeChange}
          >
          {removeDuplicates(timers).map((time) => (
          <MenuItem
            value={time}
            key={time}> {time} </MenuItem>
          ))}
          </Select>
        </FormControl>
          <Button onClick={resetFilter}  color="error">x</Button>
        </div>
      </div>
    </div>

    <br />




</CardContent>
</Card>


  <h3>Q&A Archives:</h3>
  <div id="render">
  </div>


  </div>
  <Footer />


  </>)
}

const handleSearch = (event) => {
  console.log(event.target.value);
  let x = event.target.value.toLowerCase().replace(/ /g,'-');
  let list = document.getElementsByClassName('recipe');

  if (x.length > 2){
    console.log('start search...')

  for (let i=0;i<list.length;i++){


    let clist = list[i].classList.value.replace(/ /g,'-');
      //console.log(clist.match(x) !== null);
    if (clist.match(x) == null){
      list[i].classList.add('hidden');
    } else {
      list[i].classList.replace('hidden','visible');
    }

  }

  } else {
    resetFilter();
  }


};


  function resetFilter() {
    let list = document.getElementsByClassName('recipe');

    for (let i=0;i<list.length;i++){
        list[i].classList.replace('hidden','visible');
      }
    }


  const handleTimeChange = (event) => {
    //setTime(event.target.value);
    document.getElementById("time").value = event.target.value;
    console.log(document.getElementById("time").value);

    let x = document.getElementById("time").value;
    //console.log(x);
    let list = document.getElementsByClassName('recipe');

    for (let i=0;i<list.length;i++){

      if (list[i].classList.contains(x)===false){
        list[i].classList.add('hidden');
      } else {
        list[i].classList.replace('hidden','visible');
      }
    }
  };

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
