import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config'

const NotificationList = () => {
 const {value} = useContext(AppContext);
 const [notif,setNotif] = useState([])

 useEffect(() => {
  const fetchNotif = async ()  => {
    const { data, error } = await supabase.from('notification')
    .select()
    // .eq('receive_id',value.data.uid)
    .match({receive_id:value.data.uid, unread: true })
    if(error) console.log(`${error} No data`);
    else{
        console.log(data);
        setNotif(data)
    }
  }
  fetchNotif()
 },[])

const readNotif = async (e) => {

  const { err ,data}= await supabase.from('notification')
  .update({ unread:false})
  .eq('receive_id',value.data.uid)
  if(err) console.log(err);
  else console.log(data);

} 
    return(
   <li className='hvr-underline-from-center py-3 is-clickable '>
        <Link to={`/notification/${value.data.uid}`} onClick={readNotif}>
        <i className="fa fa-bell-o text-white is-size-5" aria-hidden="true"></i>
        </Link>
        {
        notif.length < 1 || undefined ? '' : 
        <span className="tag is-info is-rounded notif py-1 px-2 is-title is-bold ">{notif === undefined ? '' : notif.length}</span>
        }   
   </li>  
    )
}

export default NotificationList ;