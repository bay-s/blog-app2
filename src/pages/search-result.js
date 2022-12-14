import React, { useContext, useEffect, useState } from 'react'
import supabase from '../supabase-config';
import AnimasiSkeleton from './animasi-skeleton';
import Headers from './headers';
import Pagination from './pagination';
import PostCard from './post-card';
import SidebarHome  from './sidebar-home';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../dashboard/error-message';
import { AppContext } from '../App';



const SearchResult = (props) => {
 const {value} = useContext(AppContext)
 const {id} = useParams()
 const [post,setPost] = useState([])
 const [loader,setLoader] = useState(true)
const [message,setMessage] = useState({
    pesan:'',
    error:false
})

 useEffect(() => {
    searchPost()
 },[post])

 const searchPost = async () =>{
    const { data, error } = await supabase
    .from('posts')
    .select()
    .ilike('post_title', `%${id}%`)
    if(data){
        console.log(data);
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
           const timer = resetTimer()
           return () => clearTimeout(timer);
        }
    }if(error){
      console.log(`404 not found ${error.message}`);
    }
   }

 const resetTimer = () => {
   setTimeout(() => {
    setLoader(false)
    console.log('resetto');
    }, 1000);
 }
    return(
     <>
      <Headers />
 <div className='container is-fluid is-max-widescreen my-5 post'>
 <article className='columns is-multilne home-container'>
        <div className='column is-3 box bg-dark sidebars' ref={value.sidebars}>
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
 <div className='py-5 px-4'>
{/* <Pagination setValue={setValue} totalPost={totalPost} value={value} /> */}
<ErrorMessage pesan={message.pesan} isError={message.error} sukses={false}/>
</div>
{/* END PAGINATION */}
</div>
        {/* end column card */}

    </article>
    {/* END COLUMNS */}
    </div>

{/* MODAL */}
<div class={value.open  ? 'modal is-active' : "modal"}>
  <div class="modal-background" onClick={value.openSidebar}></div>
  <button class="modal-close is-large" aria-label="close" onClick={value.openSidebar}></button>
 </div>
{/* END MODAL */}
    </> 
    )
}

export default SearchResult;