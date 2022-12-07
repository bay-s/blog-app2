import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import supabase from "../supabase-config";
import Author from "./author";


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
<div className='box shadow is-flex align-center is-flex-gap-md bg-dark'>
{
    followingUser.length < 1 ? '' 
    :
    followingUser.map(following => {
        return <Author id={following.following_id}/>
    })
}
</div>
    )
}

export default TotalFollowing;