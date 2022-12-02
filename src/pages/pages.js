import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Author from '../dashboard/author'
import supabase from '../supabase-config'
import Headers from './headers'
import SidebarHome from './sidebar-home'
import timeDifference from './timestamp'


const Pages = () => {
    const {id} = useParams()
    const [post,setPost] = useState([])
    const [loader,setLoader] = useState(false)
    
    useEffect(() => {
     fetchPost()
     const timer = setTimeout(() => {
      setLoader(false)
      }, 1000);
      return () => clearTimeout(timer);
    },[post])
    
    const fetchPost = async () => {
     const { data, error } = await supabase
     .from('pages')
     .select()
     .eq('pages_title',id)
     if(data){
       console.log(data);
       setPost(data)
     }if(error) console.log(error.message);
    }
    
    const createMarkup = (posts) => {
     return {__html:posts.pages_content};
    }
        return(
            <>
            <Headers />
          <div className='container is-fluid is-max-widescreen my-5 post'>
          <article className='columns is-multilne'>
              <div className='column is-3 box bg-dark'>
                  <SidebarHome />
              </div>
      <div className='column p-0'>
      {/* start post */}
      {post.length < 1 ? "" : post.map(posts => {
       return <div className="tile is-parent">
            <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column">
            <div className="card-image mb-2">
                 {posts.pages_thumbnail !== null ? 
                 <figure className="image is-16by9">
                  <img src={posts.pages_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
                  </figure>
                  : ""
                  }
                 
              </div>
                  <p className="title is-3 text-title">{posts.pages_title}</p>
                  <div dangerouslySetInnerHTML={createMarkup(posts)} />
                  <div className='is-flex align-center is-flex-gap-md my-3'>
                  <p className="is-title is-size-7 has-text-grey-lighter">{timeDifference(posts.created_at)}</p>
   
                  </div>
                </article>
    </div>
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

export default Pages;


