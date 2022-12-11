import React from 'react'


const RegisterForm = (props) => {

    return(
  <form className=' is-flex is-flex-direction-column is-flex-gap-md p-5' onSubmit={props.RegisterUser}>
        <p className="mb-4 py-4  has-text-primary is-size-3 main-title text-center">Register</p>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-large bg-dark text-white" type="text" name='username' placeholder="Username"  onChange={props.handlerChange}/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </div>
        </div>
        {/* END USERNAME FIELD */}
        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input className="input is-large bg-dark text-white" type="text" name='fullname' placeholder="Full name" onChange={props.handlerChange}/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </div>
        </div>
          {/* END FULLNAME FIELD */}    

        <div className="field">
          <p classNames="control has-icons-left has-icons-right">
            <input className="input is-large bg-dark text-white" type="email" name='email' placeholder="Email" onChange={props.handlerChange}/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
        </div>
          {/* END EMAIL FIELD */}    
        <div className="field ">
          <p className="control has-icons-left">
            <input className="input is-large bg-dark text-white" type="password" name='password' placeholder="Password" onChange={props.handlerChange}/>
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
            {/* END PASSWORD FIELD */}  

        <div className="field">
          <p className="control">
        {props.isSubmit ? <button className="button is-primary is-loading is-title is-fullwidth" disabled>
             Register </button> : <button type='submit' className="button is-primary is-title is-fullwidth">
             Register
            </button>}
          </p>
        
        </div>
</form>
    )
}

export default RegisterForm 