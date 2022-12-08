import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import BookmarkList from './bookmark-list'


const Bookmarked = () => {
    const [post,setPost] = useState([])
    const {value} = useContext(AppContext)
    const [totalPost,setTotalPost] = useState(0)
    const [values,setValue] = useState({
      page:0,
      leftPage:totalPost,
      counts:4
      })
    
    useEffect(() => {
    fetchBookmark()
    },[])
  
    const fetchPost = async (id) => {
     const { data, error ,count} = await supabase
     .from('posts')
     .select('*', { count: 'exact' })
     .eq('id',id)
     .order("id", { ascending: true })
     .range(values.page,values.counts)
     if(data){
       console.log(data);
       setTotalPost(count)
       setPost(data)
     }if(error) console.log(error.message);
    }
   
    const fetchBookmark = async () => {
        const { data, error ,count} = await supabase
        .from('bookmark')
        .select('*', { count: 'exact' })
        .eq('mark_id',value.data.uid)
        .order("id", { ascending: true })
        .range(values.page,values.counts)
        if(data){
          console.log(`Data from bookmark ${data}`);
           data.map(mark => {
            return fetchPost(mark.post_id);
           })
        }if(error) console.log(error.message);
       }
  
    return(
<section class="section is-main-section p-2">
{
    post.length < 1 ? '' 
    : post.map(posts => {
        return <BookmarkList post={posts} key={post}/>
    })
}
    {/* <Pagination setValue={setValue} totalPost={totalPost} value={value} /> */}
</section>
    )
}

export default Bookmarked