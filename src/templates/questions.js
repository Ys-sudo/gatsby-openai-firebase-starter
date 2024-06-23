import React from 'react';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby-link'
import Footer from "../components/footer";
import '../pages/index.css'

const explore = () => {
  navigate('/archives')
}

const QATemplate = ({ pageContext }) => {
  const { answer, date, question, time } = pageContext;

  return (
    <>
    <Button color="secondary" variant="contained" style={{position:'fixed',top:'10px',left:'10px',marginLeft:'10px',marginRight:'10px'}} onClick={explore}><span className="small">Q&A archives</span></Button>
    <div className='container' style={{ marginTop:'50px',padding: '20px' }}>
      <h1><b>Question:</b> {question} </h1>
      <p><strong>Answer:</strong> {answer}</p>
      <p><strong>Day:</strong> {date}</p>
      <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
    </div>
    <Footer />
    </>
  );
};

export default QATemplate;
