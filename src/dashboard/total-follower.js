import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import supabase from "../supabase-config";
import Author from "./author";
import Avatar from "./avatar";

const TotalFollower = () => {
    const {value} = useContext(AppContext)
    const [followerUser,setFollowerUser] = useState([])
console.log(value.data.uid);
    useEffect(() => {
     const  getFollower = async () => {
        const { data, error } = await supabase
        .from('follower')
        .select()
        .eq('user_id',value.data.uid)
        if(error) console.log(error);
        else{
            console.log(data);
            setFollowerUser(data)
        }
     }
     getFollower()
    },[])

    return(
<div className='columns is-multiline'>
{
    followerUser.length < 1 ? '' 
    :
    followerUser.map(following => {
        return <div className='column is-4 '>
        <div class="tile is-child box  bg-dark ">
        <div class="level-item has-text-centered is-flex-gap-md">
<figure class="image is-32x32">
<Avatar id={following.follower_id}/>
</figure>
        <Author id={following.follower_id}/>
        </div>
        </div>
        {/* end tile */}
 </div>
    })
}
</div>
    )
}

export default TotalFollower;