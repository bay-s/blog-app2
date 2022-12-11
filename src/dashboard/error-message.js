import React from 'react'


const ErrorMessage = (props) => {

    return(
        <>
<article className={props.isError ? "message is-danger" : 'hide'}>
<div className="message-body">
 <i> {props.pesan}</i>
</div>
</article>
<article className={props.sukses ? "message is-success" : 'hide'}>
<div className="message-body">
<i> {props.pesan}</i>
</div>
</article>
        </>
    )
}

export default  ErrorMessage ;