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
  <div style={{display:'flex',position:'fixed',bottom:'15px',width:'100%',justifyContent:'space-evenly',flexWrap:'wrap'}}>
    <Button variant="outlined" color="secondary" onClick={earlyAccess}>
    Early Access
    </Button>
    <Button variant="outlined" color="secondary" onClick={about}>
    About
    </Button>
  </div>
  </>
)
}

export default Footer
