import React from 'react'
import { navigate } from 'gatsby-link'
import { Link } from 'gatsby'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function encode(data) {
  const formData = new FormData()


  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData

}

export default class FormMsg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }


  handleSubmit = e => {

    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate('/thank-you/'))
      .catch(error => alert(error))

}
  render() {
    return (
      <>





        {/*message*/}

        <form
          name="contact-form"
          method="post"
          action="/thank-you/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
          style={{textAlign:'center',border:'1px solid #9c27b0',padding:'7%',margin:'5%',borderRadius:'20px'}}


        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="file-upload" />
          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field"
              onChange={this.handleChange}
              />
            </label>
          </div>
          <h3>Contact form:
          </h3>
          <p>Do you have any questions about the project?<br /> Feel free to use our form.</p>
          <div className="field">
            <div className="control">
              <TextField
                className="input form-control"
                label="Name"
                color="secondary"
                style={{minWidth:'100%'}}
                type={'text'}
                name={'Name'}
                onChange={this.handleChange}
                id={'namex'}
                required={true}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <TextField
                className="input form-control"
                type={'email'}
                name={'email'}
                label="E-mail"
                color="secondary"
                style={{minWidth:'100%'}}
                onChange={this.handleChange}
                id={'emailx'}
                required={true}
              />
            </div>
          </div>


          <div className="field">
            <div className="control">
              <TextField
                className="input form-control"
                type={'tel'}
                name={'phone'}
                label="Phone number"
                color="secondary"
                style={{minWidth:'100%'}}
                onChange={this.handleChange}
                id={'phonex'}
                required={true}
              />
            </div>
          </div>


          <div className="field">
            <div className="control">
              <TextField
                color="secondary"
                type={'text'}
                name={'message'}
                multiline={true}
                label="Message"
                minRows="3"
                style={{minWidth:'100%'}}
                onChange={this.handleChange}
                id={'msgx'}
                required={true}
              ></TextField>
            </div>
          </div>
          <br />
          <div className="control">
          <input required={true} className='btn btn-danger' type="checkbox" id="privacyX" name="privacy" defaultChecked="true" value="none"/>&nbsp;&nbsp;
          <label className='form-text' style={{fontSize: '10px'}}  htmlFor="privacyX"> I agree to processing my data acording to our privacy policy.</label><br></br><br></br>
          </div>

          <div className="field">
            <Button variant="contained" color="secondary" type="submit">
              send
            </Button>
          </div>
        </form>








      </>
    )
  }
}
