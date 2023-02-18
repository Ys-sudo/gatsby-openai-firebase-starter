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
  <div style={{display:'flex',position:'fixed',bottom:'10px',right:'10px',maxWidth:'60%',marginLeft:'40%',justifyContent:'flex-end',alignItems:'center',zIndex:'0',flexWrap:'wrap'}}>
    <Button style={{margin:'10px',fontSize:'12px'}} color="secondary" onClick={about}>
    About
    </Button>
    <Button style={{margin:'10px',fontSize:'12px'}} color="secondary" onClick={earlyAccess}>
    Early Access
    </Button>
  </div>
  <div style={{position:'fixed',right:'10px',bottom:'55px'}}>
  <a style={{margin:'10px'}} href="https://github.com/ys-sudo/gatsby-openai-firebase-starter"><img src="https://img.shields.io/github/stars/ys-sudo/gatsby-openai-firebase-starter?style=social" alt="stars - gatsby-openai-firebase-starter" /></a>
  </div>
  </>
)
}

export default Footer
