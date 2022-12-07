import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';

const Main = (props) => {
  const {value} = useContext(AppContext);
  const [totalUser,setTotalUser] = useState(null)
  
  useEffect(() => {
    const fetchUser= async () => {
      const { data, error ,count} = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .eq('uid',value.uid)
      if(data){
        console.log(data);
        setTotalUser(count)
      }if(error) console.log(error.message);
     }
     fetchUser()
  },[])
    return(
   <div className='columns is-multiline'>
        <div className='column is-4 '>
        <div class="tile is-child box  bg-dark ">
        <div class="level-item has-text-centered ">
            <div className=''>
              <p class="heading is-size-6 text-white">Posts</p>
              <p class="title text-white is-bold">{value.data.total_post < 1 ? "0" : value.data.total_post}</p>
            </div>
        </div>
        </div>
        {/* end tile */}
        </div>
        {/* END COL */}
        <div className='column is-4'>
        <div class="tile is-child box bg-dark">
        <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6 text-white">User</p>
              <p class="title text-white">{totalUser == null ? "0" : totalUser}</p>
            </div>
        </div>
        </div>
        {/* end tile */}
        </div>
        {/* END COL */}
        <div className='column is-4'>
        <div class="tile is-child box bg-dark">
        <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6 text-white">Following</p>
              <p class="title text-white">{value.data.total_following == null ? "0" : value.data.total_following}</p>
            </div>
        </div>
        </div>
        {/* end tile */}
        </div>
        {/* END COL */}
        <div className='column is-4'>
        <div class="tile is-child box bg-dark">
        <div class="level-item has-text-centered">
            <div>
              <p class="heading is-size-6 text-white">Followers</p>
              <p class="title text-white">{value.data.total_follower == null ? "0" : value.data.total_follower}</p>
            </div>
        </div>
        </div>
        {/* end tile */}
        </div>
        {/* END COL */}
           </div>
    )
}

export default Main;