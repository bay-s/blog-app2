import React, { useContext, useEffect, useRef, useState } from 'react'
import timeDifference from './timestamp'
import akun from '../img/akun.jpg'
import App, { AppContext } from '../App'
import ReplyForm from './reply-form'
import Author from '../dashboard/author'
import supabase from '../supabase-config'
import AuthorComment from '../dashboard/author-comment'


const ReplyCard = (props) => {
    const {value} = useContext(AppContext)
  const [openReply,setOpenReply] = useState(false)
  const reply = props.reply
  const createMarkup = (posts) => {
        return {__html:posts.reply_content};
  }

  const opensReply = (e) => {
    setOpenReply(!openReply)
    // input.current.classList.toggle('hides')
  }     

const deleteComment = async (e) => {
    e.preventDefault()
    const id = parseFloat(e.target.dataset.id)
   if(window.confirm("Are you sure want to delete this comment ?")){
    const { error } = await supabase
    .from('reply_comment')
    .delete()
    .eq('id', id)
    if(error) alert(`Something went wrong ${error.message}`)
    else{
        alert('Delete Comment Success')
        window.location.reload()
    }
   }
}


    return(

 <div className='bg-dark shadow is-flex is-flex-column is-flex-gap-md p-4'>
 <div className='is-flex align-center is-flex-gap-md'>
 <AuthorComment id={reply.author}/>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(reply.created_at)}
 </span>
 {value.isLogin ? <i class="fa fa-trash-o is-clickable has-text-danger" data-id={reply.id} aria-hidden="true" onClick={deleteComment}></i> :
 ""}
  </div>
<div className='px-1 mb-2' dangerouslySetInnerHTML={createMarkup(reply)} />
 {/* START REPLY FORM */}
 {/* END REPLY FORM */}
</div>
    )
}

export default ReplyCard;

{/* <figure class="image is-32x32">
<img class="is-rounded" src={akun} />
</figure> */}