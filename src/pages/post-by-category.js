import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import supabase from '../supabase-config'
import AnimasiSkeleton from './animasi-skeleton'
import Headers from './headers'
import PostCard from './post-card'
import Result from './result'
import SidebarHome from './sidebar-home';


const PostByCategory = () => {
    const {id} = useParams()
    const str_id = id.toString().toLowerCase()
    const [result,setResult] = useState(false)
    const [post,setPost] = useState([])
    const [totalPost,setTotalPost] = useState(0)
    const [loader,setLoader] = useState(false)
    
useEffect(() => {
const getPost = async () => {
   const { data, error ,count} = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  .contains('post_cat', [`${str_id}`])
  if(data) {
    setPost(data)
    console.log(count);
    const total = data.length < 1 ? setTotalPost(0) : setTotalPost(count) 
    const res = data.length < 1 ? setResult(false) : setResult(true)
  }
  if(error) {
    console.log(error);
    setResult(false)
  }
}
getPost()
},[id])


const data = {
  result,
  totalPost,
  id
}
return(
    < >
    <Headers />
<div className='container is-fluid is-max-widescreen my-5 post'>
  <article className='columns is-multilne home-container'>
      <div className='column is-3 box bg-dark'>
          <SidebarHome  />
      </div>
<div className='column p-0'>
<div className='container px-3 py-1'>
<Result data={data}/>
</div>
{/* start post */}
{post.length < 1 ? "" : post.map(posts => {
return loader ? <AnimasiSkeleton /> : <PostCard  posts={posts} />
})
}
{/* END POST */}
</div>
      {/* end column card */}
  </article>
  </div>
  </> 
)
}

export default PostByCategory;