import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import akun from '../img/akun.jpg'

const AuthorComment = (props) => {
    
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
    return <div className='is-flex align-center avatars'>
<figure className="image is-24x24">
  <img className="is-rounded" src={m.avatar === '' ? akun : m.avatar} />
</figure> 
    <Link to={`/profile/${m.uid}`} className='has-text-info is-size-7 is-title'>{m.username}</Link>
</div>
})
    )
}

export default AuthorComment;

