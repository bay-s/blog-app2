import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Author from '../dashboard/author'
import Avatar from '../dashboard/avatar'
import supabase from '../supabase-config'
import Headers from './headers'
import timeDifference from './timestamp'

const NotificationPage = () => {
  const {id} = useParams()
  const [notif,setNotif] = useState([])
  console.log(id);
   useEffect(() => {
    const fetchNotif = async ()  => {
      const { data, error } = await supabase.from('notification')
      .select()
      .eq('receive_id',id)
      if(error) console.log(`${error} No data`);
      else{
          console.log(data);
          setNotif(data)
      }
    }
    fetchNotif()
   },[])

    return(
<>
 <Headers />
<div className='container is-fluid is-max-widescreen my-5 post'>
  <div className='columns is-multiline is-centered'>
 <div className='column is-9'>
 <h3 className='text-title is-title is-size-4 is-bold py-2'>Notification</h3>
 </div>
 {
    notif.length < 1 ? "" 
    : notif.map(notifs => {
let type = ''
let url = ''
switch(notifs.type) {
  case 'likes':
   type = 'Has likes your post'
   url = `/post/${notifs.url_id}`
    break;
  case 'comment':
    type = 'Has comment on your post'
    break;
case 'likes comment':
type = 'Has likes your comment'
 break;
 case 'replycomment':
type = 'Has replied to your comment'
 break;
  default:
    // code block
}
        return <Link to={url} className='column is-9 box  bg-dark is-flex is-flex-gap-xl align-start'>
{/* AUTHOR AVATAR */}
<div className='is-flex align-center is-flex-gap-md'>
 <figure className="image is-32x32">
 <Avatar id={notifs.sender_id} />
</figure>
<div className='is-flex-column' >
 <Author id={notifs.sender_id}/>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(notifs.created_at)}
 </span>
</div>
  </div>
  {/* END AUTHOR AVATAR */}
  <div className='notifs'>
    <span className='text-white is-size-7'>
{type}
    </span>
  </div>
        </Link>
    })
 }

 
  </div>
</div>
</>
    )
}

export default NotificationPage ;

