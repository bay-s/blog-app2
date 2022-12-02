import React, { useContext, useEffect, useRef, useState } from 'react'
import timeDifference from './timestamp'
import akun from '../img/akun.jpg'
import { AppContext } from '../App'
import ReplyForm from './reply-form'
import supabase from '../supabase-config'
import ReplyCard from './comment-reply-card'

const CommentCard = (props) => {
  const {value} = useContext(AppContext)

  const [openReply,setOpenReply] = useState(false)
  const [dataReply,setDataReply] = useState([])
  const input = useRef(null)
    const comment = props.comment
    
 useEffect(() => {

   const HasReply = async (id) => {
        const { data, error } = await supabase
        .from('reply_comment')
        .select()
        .eq('comment_id',comment.id)
        if(error){
            alert(error.message)
        }else{
            console.log(data);
            setDataReply(data)
        }
    }
    HasReply()

 },[])

    const createMarkup = (posts) => {
        return {__html:posts.comment_content};
       }

  const opensReply = (e) => {
    setOpenReply(!openReply)
    input.current.classList.toggle('hides')
  }     
    return(

 <div className='bg-dark shadow is-flex is-flex-column is-flex-gap-md p-4'>
 <div className='is-flex align-center is-flex-gap-md'>
 <figure className="image is-32x32">
  <img className="is-rounded" src={akun} />
</figure>
 <h3 className='is-title text-title is-size-7'>
  {comment.author_name}
</h3>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(comment.created_at)}
 </span>
  </div>
<div className='px-1 mb-2' dangerouslySetInnerHTML={createMarkup(comment)} />
 {value.isLogin ?  <input className='input is-small bg-dark is-primary' ref={input} placeholder='Write a reply' onClick={opensReply}/> 
 : ""}
 {/* START REPLY FORM */}
 <div className={openReply ? 'fade' : 'hides'}>
 <ReplyForm opensReply={opensReply} id={comment.id} />
 </div>
 {/* END REPLY FORM */}
 {dataReply.length < 1 ? "" : dataReply.map(reply => {
  return <ReplyCard reply={reply}/>
 })}
</div>
    )
}

export default CommentCard;