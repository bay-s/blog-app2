import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'

const  PostPreview =  (props) => {
 const [nextPost,setNextPost] = useState([])
const [prevPost,setPrevPost] = useState([])
console.log(props.id);
 useEffect(() => {
 const fetchNext = async () => {
  const { data, error } = await supabase
  .from('posts')
  .select()
  .gt('id', props.id)
  .order('id', { ascending: true }) 
  .limit(1)
  if(error) console.log(error.message);
  else {
     console.log(data);
     setNextPost(data[0])
  }
 }
 fetchNext()
 fetchPrev()
 },[prevPost,nextPost])

 const fetchPrev = async () => {
     const { data, error } = await supabase
     .from('posts')
     .select()
     .lt('id', props.id)
     .order('id', { ascending: false }) 
     .limit(1)
     if(error) console.log(error.message);
     else {
          console.log(data);
          setPrevPost(data[0])
     }
    }

console.log(nextPost);
 return(
<div className='is-flex justify-between align-center' >
<div className={prevPost == undefined  ? 'hide' : 'is-flex is-flex-column is-flex-gap-sm navbar-start align-start'}>
   <span className='is-flex align-center is-flex-gap-md'>
   <i class="fa fa-long-arrow-left text-white" aria-hidden="true"></i>
     <span className='text-white'>Prev post</span>
   </span>
   <Link to={`/post/${prevPost == undefined ? '' : prevPost.id}`}  className="title is-6 text-title is-bold p-0 m-0 text-wrap">{prevPost == undefined ? '' : prevPost.post_title}</Link>
   </div>  
   <div className={nextPost == undefined ? 'hide' : 'is-flex is-flex-column is-flex-gap-sm navbar-end align-end'}>
   <span className='is-flex align-center is-flex-gap-md'>
     <span className='text-white'>Next post</span>
     <i class="fa fa-long-arrow-right text-white" aria-hidden="true"></i>
   </span>
   <Link to={`/post/${nextPost == undefined ? '' : nextPost.id}`}  className="title is-6 text-title is-bold p-0 m-0 text-wrap">{nextPost == undefined ? '' : nextPost.post_title}</Link>
  </div>  
</div>
 )
}

export default PostPreview