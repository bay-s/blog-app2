
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import akun from '../img/akun.jpg'

const Avatar= (props) => {
    
    const [userComment,setUserComment] = useState([])
     useEffect(() => {
        const getUserComment = async () => {
            const id = props.id
            const {data,err} = await supabase.from('users')
            .select()
            .eq('uid',id)
            if(data){
                setUserComment(data)
            }
            if(err) console.log(err);
        }
        getUserComment()

    },[])



    return(
userComment.length < 1 ? "" : userComment.map(m => {
    return <img class="is-rounded" src={m.avatar === '' ? akun : m.avatar} alt="IMAGES" />
})
    )
}

export default Avatar;

