import React from 'react'

function LoginForm(props){

    return(
        <form className=' is-flex is-flex-direction-column is-flex-gap-md p-3' onSubmit={props.userLogin}>
        <p className="modal-card-title py-3 is-size-3 main-title text-title">Login</p>
             <div className="field">
    <p className="control has-icons-left has-icons-right">
    <input className="input is-large bg-dark text-white" type="email" name='email' placeholder="Email" onChange={props.handlerChange}/>
    <span className="icon is-small is-left">
    <i className="fa fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
    <i className="fa fa-check"></i>
    </span>
    </p>
    </div>
    <div className="field ">
    <p className="control has-icons-left">
    <input className="input is-large bg-dark text-white" type="password" name='password' placeholder="Password" onChange={props.handlerChange}/>
    <span className="icon is-small is-left">
    <i className="fa fa-lock"></i>
    </span>
    </p>
    </div>
    
    <article className={props.error ? "message is-danger" : 'hide'}>
    <div className="message-body">
    <i> {props.pesan}</i>
    </div>
    </article>
    <article className={props.sukses ? "message is-success" : 'hide'}>
    <div className="message-body">
    <i> {props.pesan}</i>
    </div>
    </article>
    
    <div className="field">
    <p className="control ">
    
    {props.isSubmit ? <button className="button is-primary is-loading is-fullwidth is-title " disabled>
    Login
    </button>: <button type='submit' className="button is-primary is-fullwidth is-title">
    Login
    </button>}
    </p>
    </div>
    </form>
    )
}

export default LoginForm