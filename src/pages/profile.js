import React, { useContext, useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Headers from './headers'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import joinTime from './join_time';
import akun from '../img/akun.jpg'
import PostCard from './post-card';
import ButtonFollow from './button-follow';


const Profiles = (props) => {
    const {id} = useParams()
    const {value} = useContext(AppContext)
    const [post,setPost] = useState([])
    const [bookmark,setBookmark] = useState([])
    const [notFound,setNotFound] = useState(false)
    const [tabs,setTabs] = useState('post')
    const [data,setData] = useState([])

    useEffect(() => {
      const getUserDetail = async () => {
        const {data,error} = await supabase
        .from('users')
        .select()
        .eq('username',id)
        .single()
        if(error){
          console.log(error);
          setNotFound(true)
        }
        if(data){
          const datas = data.uid
          setData(data)
          fetchPost(datas)
          setNotFound(false)
          bookmarkPosts(datas)
          console.log(data);
        }
      }
      getUserDetail()
    },[])


    const fetchPost = async (datas) => {
     const { data, error } = await supabase
     .from('posts')
     .select('*', { count: 'exact' })
     .eq('author_id',datas)
     if(data){
       console.log(data);
       setPost(data)
     }if(error) console.log(error.message);
    }
   
    const bookmarkPosts = async (user) => {
      const { data, error} = await supabase
      .from('bookmark')
      .select()
      .eq('mark_id',user)
      if(data){
        data.map(item => {
          return fetchPostBookmark(item.post_id)
        })
      }if(error) console.log(error.message);
    }

    const fetchPostBookmark = async (id) => {
      const { data, error} = await supabase
      .from('posts')
      .select()
      .eq('id',id)
      if(data){
        console.log(data);
        setBookmark(data)
      }if(error) console.log(error.message);
    } 
const openTabs = (e) =>{
e.preventDefault()
setTabs(e.target.dataset.tabs)
    }
    const createMarkup = (biodata) => {
      return {__html:biodata};
     }

     const postCard = post.length < 1 ? '' :
     post.map(posts => {
       return <PostCard posts={posts} />
     })
   
     const bookmarkPost = bookmark.length < 1 ? '' :
     bookmark.map(posts => {
       return <PostCard posts={posts} key={posts}/>
     })
    return(
<>
<Headers />
{
  notFound ? <Navigate to="*" replace={true} />  
  :
<div className='container is-fluid is-max-widescreen my-5 post'>
  <div className='columns is-multiline is-centered'>
  <section className='column is-9 box  bg-dark'>
  <article className='is-flex-column is-flex-gap-xl'>

  <figure class="image is-128x128 mx-auto">
{
  data.avatar === '' || null ? <img class="is-rounded avatars" src={akun} />
  :   <img class="is-rounded avatars" src={data.avatar} />
}
  </figure>

  <div className='is-flex-column is-flex-gap-sm text-center'>
    <h1 className='text-white is-title is-bold is-size-5'>{data.fullname}</h1>
    
     <div className={data.biodata == null ? "hide" : "biodata"} dangerouslySetInnerHTML={createMarkup(data.biodata)} />  

     <div className='is-flex align-center is-flex-gap-lg justify-center'>
      <p className='is-flex align-center is-flex-gap-md'>
      <i class="fa fa-calendar is-size-7" aria-hidden="true"></i>
      <span className='is-size-7'>Joined on</span>
      <span className='is-size-7'>{joinTime(data.created_at)}</span>
      </p>
      <a href='#' className='text-title is-size-7'>www.mywebsite.com</a>
      {
    value.data.username === data.username ?  <Link to='/dashboard/edit-profile/' className='button is-primary is-outlined is-small '>Edit Profilew</Link>
        :
        <ButtonFollow id={id} current_user={value.data} data={data}/>
      }
     </div>
  </div>
  </article>
  <hr className='divider'/>
 <div className='columns is-multiline'>
     <div className={data.education === null || '' ?  'hide' : 'column is-flex-column text-center has-text-white'}>
      <h1 className='text-title is-bold is-title'>Education</h1>
      <span>
    {data.education}
      </span>
     </div>
     <div className={data.job === null || '' ? 'hide' : 'column is-flex-column text-center has-text-white'}>
      <h1 className='text-title is-bold is-title'>Work</h1>
      <span>
      {data.job}
      </span>
     </div>
 </div>
</section>
{/* START POST HISTORY */}
<section className='is-flex-column column is-9  box bg-transparent'>
  <div className='columns is-multiline'>
  <div className='column is-3 p-0 is-flex-column is-flex-gap-lg '>
    <ul className='is-flex-column actions bg-dark p-2'>
    <li className='is-flex align-center is-flex-gap-lg' data-tabs="post" onClick={openTabs}>
      <i class="fa fa-rss" aria-hidden="true" data-tabs="post"></i>
       <span className='text-white' data-tabs="post">Posts</span>
       {
      post.length < 1 || undefined ? ''
      :
      <span className="tag is-info is-title is-bold"  data-tabs="post">{post.length}</span>
        }
      </li>
    <li className='is-flex align-center is-flex-gap-lg bg-' data-tabs="saved" onClick={openTabs}>
       <i class="fa fa-bookmark-o " aria-hidden="true" data-tabs="saved"></i>
       <span className='text-white' data-tabs="saved">Saved</span>
       {
      bookmark.length < 1 || undefined ? ''
      :
      <span className="tag is-info is-title is-bold"  data-tabs="saved">{bookmark.length}</span>
        }
    </li>
    </ul>

  </div>
     <div className='column is-9 p-0 fade'>
      {
      tabs === 'post' ? postCard : bookmarkPost
      }
     </div>
  </div>
</section>
{/* END POST HISTORY */}
  </div>
</div>
}

</>
    )
}

export default Profiles;