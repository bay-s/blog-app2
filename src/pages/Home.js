import React, { useEffect, useState } from 'react'
import supabase from '../supabase-config';
import AnimasiSkeleton from './animasi-skeleton';
import Headers from './headers';
import Pagination from './pagination';
import PostCard from './post-card';
import SidebarHome from './sidebar-home';


const Home = () => {
 const [post,setPost] = useState([])
 const [loader,setLoader] = useState(true)
 const [totalPost,setTotalPost] = useState(0)
 const [test,setTest] = useState(0)
 const [value,setValue] = useState({
  page:0,
  leftPage:totalPost,
  counts:4
  })

 useEffect(() => {
  fetchPost()
  const timer = setTimeout(() => {
    setLoader(false)
    }, 1000);
    return () => clearTimeout(timer);
 },[value.page,value.counts])

 const fetchPost = async () => {
  const { data, error,count} = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  // .range(value.page,value.counts)
  if(data){
    console.log(data);
    setTotalPost(count)
    setPost(data)
    
  }if(error) console.log(error.message);
 }

 
    return(
     <>
      <Headers />
 <div className='container is-fluid is-max-widescreen my-5 post'>
 <article className='columns is-multilne home-container'>
        <div className='column is-3 box bg-dark'>
            <SidebarHome />
        </div>
<div className='column p-0'>
{/* start post */}
{post.length < 1 ? "" : post.map(posts => {
  return loader ? <AnimasiSkeleton /> : <PostCard posts={posts} />
})
}
  {/* END POST */}
  
 {/* PAGINATION */}
<Pagination setValue={setValue} totalPost={totalPost} value={value} />
{/* END PAGINATION */}
</div>
        {/* end column card */}

    </article>
    {/* END COLUMNS */}
    </div>
    </> 
    )
}

export default Home;