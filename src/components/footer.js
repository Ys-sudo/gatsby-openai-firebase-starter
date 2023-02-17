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
  <div style={{display:'flex',position:'fixed',bottom:'15px',width:'100%',justifyContent:'space-evenly',alignItems:'center',flexWrap:'wrap'}}>
    <Button variant="outlined" color="secondary" onClick={earlyAccess}>
    Early Access
    </Button>
    <Button variant="outlined" color="secondary" onClick={about}>
    About
    </Button>
    <a href="https://github.com/ys-sudo/gatsby-openai-firebase-starter" title="Go to GitHub repo"><img src="https://img.shields.io/static/v1?label=ys-sudo&message=gatsby-openai-firebase-starter&color=9c27b0&logo=github" alt="ys-sudo - gatsby-openai-firebase-starter" /></a>
    <a href="https://github.com/ys-sudo/gatsby-openai-firebase-starter"><img src="https://img.shields.io/github/stars/ys-sudo/gatsby-openai-firebase-starter?style=social" alt="stars - gatsby-openai-firebase-starter" /></a>
    <a href="https://github.com/ys-sudo/gatsby-openai-firebase-starter"><img src="https://img.shields.io/github/forks/ys-sudo/gatsby-openai-firebase-starter?style=social" alt="forks - gatsby-openai-firebase-starter" /></a>
  </div>
  </>
)
}

export default Footer
