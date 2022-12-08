import React from 'react'
import { useParams } from 'react-router-dom'
import Headers from './headers'

const NotificationPage = () => {
  const {id} = useParams()
    return(
<>
    <Headers />
<div class="container is-fluid my-5">

</div>
</>
    )
}

export default NotificationPage ;

