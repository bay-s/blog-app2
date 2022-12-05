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
      const timer = setTimeout(() => {
        setLoader(false)
        }, 1000);
        return () => clearTimeout(timer);
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


    return(
        <>
        <Headers />
 <div className='container is-fluid is-max-widescreen my-5 post'>
      <article className='columns is-multilne single-container'>
          <div className='column is-3 box bg-dark'>
              <SidebarHome />
          </div>
<div className='column p-0 px-4'>
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