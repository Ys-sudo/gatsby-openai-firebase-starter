import * as React from "react"
import { navigate } from 'gatsby-link'
import Button from '@mui/material/Button'

const earlyAccess = () => {
    navigate('/early-access')
}

const about = () => {
    navigate('/about')
}


const Footer = () => {
  return(
  <>
  <div style={{display:'flex',position:'fixed',bottom:'15px',right:'10px',maxWidth:'60%',marginLeft:'40%',justifyContent:'space-evenly',alignItems:'center',flexWrap:'wrap'}}>
    <Button style={{margin:'10px'}} variant="outlined" color="secondary" onClick={earlyAccess}>
    Early Access
    </Button>
    <Button style={{margin:'10px'}} variant="outlined" color="secondary" onClick={about}>
    About
    </Button>
  </div>
  <div style={{position:'fixed',left:'10px',bottom:'75px'}}>
  <a style={{margin:'10px'}} href="https://github.com/ys-sudo/gatsby-openai-firebase-starter"><img src="https://img.shields.io/github/stars/ys-sudo/gatsby-openai-firebase-starter?style=social" alt="stars - gatsby-openai-firebase-starter" /></a>
  <br />
  <a style={{margin:'10px'}} href="https://github.com/ys-sudo/gatsby-openai-firebase-starter"><img src="https://img.shields.io/github/forks/ys-sudo/gatsby-openai-firebase-starter?style=social" alt="forks - gatsby-openai-firebase-starter" /></a>
  </div>
  </>
)
}

export default Footer
