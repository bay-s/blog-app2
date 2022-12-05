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
    const [notFound,setNotFound] = useState(false)
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
          setData(data)
          fetchPost(data)
          setNotFound(false)
          console.log(data);
        }
      }
      getUserDetail()
    },[])


    const fetchPost = async (datas) => {
     const { data, error ,count} = await supabase
     .from('posts')
     .select('*', { count: 'exact' })
     .eq('author_id',datas.uid)
     if(data){
       console.log(data);
       setPost(data)
     }if(error) console.log(error.message);
    }
   
  
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
     <div className='biodata'>
      {data.biodata == null ? "" : data.biodata}
     </div>
     <div className='is-flex align-center is-flex-gap-lg justify-center'>
      <p className='is-flex align-center is-flex-gap-md'>
      <i class="fa fa-calendar is-size-7" aria-hidden="true"></i>
      <span className='is-size-7'>Joined on</span>
      <span className='is-size-7'>{joinTime(data.created_at)}</span>
      </p>
      <a href='#' className='text-title is-size-7'>www.mywebsite.com</a>
      {
        value.data.username === data.username ?   <Link to='/dashboard/edit-profile/' className='button is-primary is-small is-rounded'>Follow</Link>
        :
        <ButtonFollow id={id} user_login_id={value.data.uid} user={value.data.users} data={value.data}/>
      }
     </div>
  </div>
  </article>
  <hr className='divider'/>
 <div className='is-flex align-center'>
     <div className='is-flex-column text-center has-text-white'>
      <h1 className='text-title'>Education</h1>
      <span>
      Line 23:4:  React Hook useEffect has a missing dependency: 'searchPost'. Either include it or remove the dependency array
      </span>
     </div>
     <div className='is-flex-column text-center has-text-white'>
      <h1 className='text-title'>Education</h1>
      <span>
      Line 23:4:  React Hook useEffect has a missing dependency: 'searchPost'. Either include it or remove the dependency array
      </span>
     </div>
 </div>
</section>
{/* START POST HISTORY */}
<section className='is-flex-column column is-9  box bg-transparent'>
  <div className='columns is-multiline'>
  <div className='column is-3 p-0 is-flex-column is-flex-gap-lg '>
    <ul className='is-flex-column actions bg-dark p-2'>
    <li className='is-flex align-center is-flex-gap-lg bg-'>
       <i class="fa fa-bookmark-o " aria-hidden="true"></i>
       <span className='text-white'>Saved</span>
      </li>
      <li className='is-flex align-center is-flex-gap-lg'>
      <i class="fa fa-rss" aria-hidden="true"></i>
       <span className='text-white'>Posts</span>
      </li>
      <li className='is-flex align-center is-flex-gap-lg'>
       <i class="fa fa-bookmark-o " aria-hidden="true"></i>
       <span className='text-white'>Saved</span>
      </li>
    </ul>

    <ul className='is-flex-column actions bg-dark p-2'>
    <li className='is-flex align-center is-flex-gap-lg'>
       <i class="fa fa-bookmark-o " aria-hidden="true"></i>
       <span className='text-white'>Saved</span>
      </li>
      <li className='is-flex align-center is-flex-gap-lg'>
       <i class="fa fa-bookmark-o " aria-hidden="true"></i>
       <span className='text-white'>Saved</span>
      </li>
      <li className='is-flex align-center is-flex-gap-lg'>
       <i class="fa fa-bookmark-o " aria-hidden="true"></i>
       <span className='text-white'>Saved</span>
      </li>
    </ul>
  </div>
     <div className='column is-9 p-0'>
      {
        post.length < 1 ? ''
        :
        post.map(posts => {
          return <PostCard posts={posts} />
        })
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