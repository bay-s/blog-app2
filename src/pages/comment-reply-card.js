import React, { useContext, useEffect, useRef, useState } from 'react'
import timeDifference from './timestamp'
import akun from '../img/akun.jpg'
import App, { AppContext } from '../App'
import ReplyForm from './reply-form'
import Author from '../dashboard/author'
import supabase from '../supabase-config'
import Avatar from '../dashboard/avatar'
import LikesComment from './likes-comment'

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

// const deleteComment = async (e) => {
//     e.preventDefault()
//     const id = parseFloat(e.target.dataset.id)
//    if(window.confirm("Are you sure want to delete this comment ?")){
//     const { error } = await supabase
//     .from('reply_comment')
//     .delete()
//     .eq('id', id)
//     if(error) alert(`Something went wrong ${error.message}`)
//     else{
//         alert('Delete Comment Success')
//         window.location.reload()
//     }
//    }
// }



    return(
<div className='border box bg-transparent is-flex is-flex-column is-flex-gap-md p-4'>
{/* AUTHOR AVATAR */}
<div className='is-flex align-start is-flex-gap-md'>
 <figure className="image is-32x32">
 <Avatar id={reply.author_id} />
</figure>
<div className='is-flex-column'>
 <Author id={reply.author_id}/>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(reply.created_at)}
 </span>
</div>
<div className='is-flex align-center is-flex-gap-lg mx-6'>
<Author id={reply.author_id}/> 
<span className='is-size-7 text-white'>
has replied to 
</span>
 <Author id={reply.receive_id}/>
</div>
  </div>
  {/* END AUTHOR AVATAR */}
<div className='px-1 mb-2' dangerouslySetInnerHTML={createMarkup(reply)} />
 {
value.isLogin ? 
 <ul className='is-flex is-flex-gap-md align-center actions'>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <LikesComment id={reply.id} user={value.data} post_id={reply.post_id}/>
  <span className='is-size-7'>{reply.total_likes < 1 ? '0' : reply.total_likes} Likes</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable' data-comment={reply.id} onClick={opensReply}> 
  <i className="fa fa-comment-o" aria-hidden="true"  data-comment={reply.id}></i>
  <span className='is-size-7'  data-comment={reply.id}>Reply</span>
  </li>
</ul> 
:''
}
 {/* START REPLY FORM */}
 <div className={openReply ? 'fade my-3' : 'hides'}>
 {/* <ReplyForm opensReply={opensReply} comment_id={commentId} post_id={comment.post_id} /> */}
 </div>
 {/* END REPLY FORM */}
</div>
    )
}

export default ReplyCard;








 {/* <div className='bg-dark shadow is-flex is-flex-column is-flex-gap-md p-4'>
 <div className='is-flex align-center is-flex-gap-md'>
 <AuthorComment id={reply.author}/>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(reply.created_at)}
 </span>
 {value.isLogin ? <i class="fa fa-trash-o is-clickable has-text-danger" data-id={reply.id} aria-hidden="true" onClick={deleteComment}></i> :
 ""}
  </div>
<div className='px-1 mb-2' dangerouslySetInnerHTML={createMarkup(reply)} />

</div> */}