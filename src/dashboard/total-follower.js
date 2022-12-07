import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import supabase from "../supabase-config";
import Author from "./author";


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
<div className='box shadow is-flex align-center is-flex-gap-md bg-dark'>
{
    followerUser.length < 1 ? '' 
    :
    followerUser.map(following => {
        return <Author id={following.follower_id}/>
    })
}
</div>
    )
}

export default TotalFollower;