import React, { useContext, useEffect, useRef, useState } from 'react'
import timeDifference from './timestamp'
import { AppContext } from '../App'
import ReplyForm from './reply-form'
import supabase from '../supabase-config'
import ReplyCard from './comment-reply-card'
import Avatar from '../dashboard/avatar'
import Author from '../dashboard/author'
import LikesComment from './likes-comment'



const CommentCard = (props) => {
  const {value} = useContext(AppContext)
  const [commentId,setCommentId] = useState('')
  const comment = props.comment
  const [dataComment,setDataComment] = useState({
    commentId:'',
    post_id:comment.post_i,
    receive_id:comment.author_id
  })

  const [openReply,setOpenReply] = useState(false)
  const [dataReply,setDataReply] = useState([])
  const input = useRef(null)

    
 useEffect(() => {

   const HasReply = async (id) => {
        const { data, error } = await supabase
        .from('comment_reply')
        .select()
        .eq('comment_id',comment.id)
        if(error) console.log(error.message);
        else{
            console.log(data);
            setDataReply(data)
        }
    }
    HasReply()
 },[])

const createMarkup = (posts) => {
        return {__html:posts.comment_content};
}

const test = useRef(null)

  const opensReply = (e) => {
    setOpenReply(!openReply)
    const comment_id = parseFloat(e.target.dataset.comment)
    setCommentId(comment_id)
    input.current?.classList.toggle('hides')
    setDataComment({
      ...dataComment,
     commentId: comment_id
    });
  }     


    return(
<>
<div className='border box bg-transparent is-flex is-flex-column is-flex-gap-md p-4'>
{/* AUTHOR AVATAR */}
 <div className='is-flex align-center is-flex-gap-md'>
 <figure className="image is-32x32">
 <Avatar id={comment.author_id} />
</figure>
<div className='is-flex-column' ref={test}>
 <Author id={comment.author_id}/>
 <span className='has-text-grey is-size-7 is-title'>
{timeDifference(comment.created_at)}
 </span>
</div>
  </div>
  {/* END AUTHOR AVATAR */}
<div className='px-1 mb-2' dangerouslySetInnerHTML={createMarkup(comment)} />
 {
value.isLogin ? 
 <ul className='is-flex is-flex-gap-md align-center actions'>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <LikesComment id={comment.id} author_id={comment.author_id} user={value.data} post_id={comment.post_id}/>
  <span className='is-size-7'>{comment.total_likes < 1 ? '0' : comment.total_likes} Likes</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable' data-comment={comment.id} onClick={opensReply}> 
  <i className="fa fa-comment-o" aria-hidden="true"  data-comment={comment.id}></i>
  <span className='is-size-7'  data-comment={comment.id}>Reply</span>
  </li>
</ul> 
:''
}
 {/* START REPLY FORM */}
 <div className={openReply ? 'fade my-3' : 'hides'}>
 <ReplyForm opensReply={opensReply} dataComment={dataComment} />
 </div>
 {/* END REPLY FORM */}
</div>
{/* END COMMENT CONTAINER */}

{/* !-- REPLY CONTAINER */}
<div className='pl-5'>
{
  dataReply.length < 1 ? "" : dataReply.map(reply => {
  return <ReplyCard reply={reply} />
 })
 }
</div>
{/* !-- END REPLY CONTAINER */}
</>
    )
}

export default CommentCard;