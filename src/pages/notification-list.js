import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config'

const NotificationList = () => {
 const {value} = useContext(AppContext);
 const [notif,setNotif] = useState([])
console.log(value);
 useEffect(() => {
  const fetchNotif = async ()  => {
    const { data, error } = await supabase.from('notification')
    .select()
    .eq('receive_id',value.data.uid)
    if(error) console.log(`${error} No data`);
    else{
        console.log(data);
        setNotif(data)
    }
  }
  fetchNotif()
 },[])
    return(
   <li className='hvr-underline-from-center py-3 is-clickable '>
        <Link to={`/notification/:${value.data.uid}`}>
        <i class="fa fa-bell-o text-white is-size-5" aria-hidden="true"></i>
        </Link>
        <span class="tag is-info is-rounded notif py-1 px-2 is-title is-bold ">{notif === undefined ? '' : notif.length}</span>
   </li>  
    )
}

export default NotificationList ;