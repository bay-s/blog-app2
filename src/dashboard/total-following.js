import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import supabase from "../supabase-config";
import Author from "./author";
import Avatar from "./avatar";


const TotalFollowing = () => {
    const {value} = useContext(AppContext)
    const [followingUser,setFollowingUser] = useState([])

    useEffect(() => {
     const getFollowing = async () => {
        const { data, error } = await supabase.from('following')
        .select()
        .eq('user_id',value.data.uid)
        if(error) console.log(error);
        else{
            console.log(data);
            setFollowingUser(data)
        }
     }
     getFollowing()
    },[])

    return(
<div className='columns is-multiline'>
{
    followingUser.length < 1 ? '' 
    :
    followingUser.map(following => {
        return <div className='column is-4 '>
        <div class="tile is-child box  bg-dark ">
        <div class="level-item has-text-centered is-flex-gap-md">
<figure class="image is-32x32">
<Avatar id={following.following_id}/>
</figure>
        <Author id={following.following_id}/>
        </div>
        </div>
        {/* end tile */}
 </div>
    })
}


</div>
    )
}

export default TotalFollowing;