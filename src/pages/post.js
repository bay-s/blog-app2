import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import supabase from '../supabase-config'
import AnimasiSkeleton from './animasi-skeleton'
import Headers from './headers'
import SidebarHome from './sidebar-home'
import CommentForm from './comment-form'
import HasComment from './has_comment'
import PostCardSingle from './post-card-single'
import CommentCard from './comment-card'
import ErrorMessage from '../dashboard/error-message'

const PostDetail = (props) => {
const {id} = useParams()
const [post,setPost] = useState([])
const [loader,setLoader] = useState(true)
const [dataComment,setDataComment] = useState([])
const [message,setMessage] = useState({
  pesan:'',
  error:false
})

useEffect(() => {
 fetchPost()
 const timer = setTimeout(() => {
  setLoader(false)
  }, 1000);
  return () => clearTimeout(timer);
},[post])

const fetchPost = async () => {
 const comments = await HasComment(id);
 setDataComment(comments)
 const { data, error } = await supabase
 .from('posts')
 .select()
 .eq('id',id)
 if(data){
   setPost(data)
   console.log(data);
   console.log(data.length < 1);
   if(data.length < 1) {
    setMessage({...message,
       pesan:'Post not found',
       error:true
        })
   }else{
    setMessage({
        pesan:``,
        error:false,
      })
}
 }if(error) {
  setMessage({...message,
    pesan:'Post not found',
    error:true
     })
  console.log(error.message);
    }
}


const postCard = post.length < 1 ? "" : post.map(posts => {
  return <PostCardSingle posts={posts} key={post}/>
 })

console.log(post.length < 1);
    return(
        <>
        <Headers />
 <div className='container is-fluid is-max-widescreen my-5 post'>
      <article className='columns is-multilne single-container'>
          <div className='column is-3 box bg-dark'>
              <SidebarHome />
          </div>
<div className='column p-0'>
  {/* start post */}
<ErrorMessage pesan={message.pesan} isError={message.error} sukses={false}/>
{loader ? <AnimasiSkeleton /> : postCard}
    {/* END POST */}
{/* DISPLAY COMMENT */}

<article className='section is-main-section px-5 py-1'>

{dataComment == undefined ? "" :
dataComment.map(comment => {
  return <CommentCard comment={comment}/>
})
}
</article>
    {/* END DISPLAY */}
   
    {/* START COMMENT FORM */}
<div className={post.length < 1 ? "hide" : ''}>
<h3 className={post.length < 1 ? 'hide' : 'text-title is-title px-3'}>
Leave a Comment
</h3>
<CommentForm id={id}/>
</div>
    {/* END COMMENT FORM */}
</div>
          {/* end column card */}
      </article>
      {/* END COLUMNS */}
</div>
      </> 
    )
}

export default PostDetail;