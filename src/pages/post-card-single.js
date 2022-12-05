import React from 'react'
import Author from '../dashboard/author'
import PostCat from '../dashboard/post-cat'
import PostTag from '../dashboard/post-tag'
import timeDifference from './timestamp'
import img from '../img/no-image.png'
import PostPreview from './next-post'


const PostCardSingle = (props) => {
     const posts = props.posts
     const createMarkup = (posts) => {
        return {__html:posts.post_content};
       }
       
    
    return(
  <div className="tile is-parent" key={posts.id}>
 <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column ">
       {posts.post_thumbnail !== '' ? 
<div className="card-image mb-2 feature-image-container">
<figure className="image is-16by9 feature-image" >
  <img src={posts.post_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
</figure> 
</div>
: ''
  }
{/* POST CAPTION */}
<header className='p-1 is-flex is-flex-column is-flex-gap-md'>
<p className="title is-3 text-title is-bold p-0 m-0 ">{posts.post_title}</p>
<div className='is-flex align-center is-flex-gap-md'>
    <PostTag tag={posts.post_tag}/>
    </div>
<div className='is-flex align-center is-flex-gap-md'>
<p className="is-title is-size-6 has-text-grey-lighter">
{timeDifference(posts.created_at)}  -</p>
<Author id={posts.author_id}/>
</div>
<div className='is-flex align-center is-flex-gap-md'>
   <PostCat cat={posts.post_cat}/>
</div>
 </header>
 {/* END POST CAPTION */}
 <div className='my-3' dangerouslySetInnerHTML={createMarkup(posts)} />
 <hr />
 {/* NEXT POST */}
<PostPreview id={posts.id} key={posts.id}/>
{/* PREV  POST */}
      </article>
</div>
    )
}

export default PostCardSingle;


{/* <figure className="image is-16by9" >
{posts.post_thumbnail !== '' ? 
  <img src={posts.post_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
  : <img src={img} alt="Placeholder image" className='post-image w-100 h-100'/>
  }
</figure> */}