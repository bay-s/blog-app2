import React from 'react'


const Result = (props) => {

    return(
        props.data.totalPost < 1 ?  <article className="message is-danger" >
<div className="message-body is-flex is-flex-gap-md align-center">
  <strong>Category : </strong>
   <span className='capital'>
    {props.data.result ? `${props.data.id} ${props.data.totalPost} Result` : `${props.data.id} ${props.data.totalPost} Result`}
   </span>
</div>
</article> 
:   <article className="message is-primary" >
<div className="message-body is-flex is-flex-gap-md align-center">
  <strong>Category : </strong>
   <span className='capital'>
    {props.data.result ? `${props.data.id} ${props.data.totalPost} Result` : `${props.data.id} ${props.data.totalPost} Result`}
   </span>
</div>
</article>
    )
}

export default Result;