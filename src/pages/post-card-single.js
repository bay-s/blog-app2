import React, { useContext } from 'react'
import Author from '../dashboard/author'
import PostCat from '../dashboard/post-cat'
import PostTag from '../dashboard/post-tag'
import timeDifference from './timestamp'
import img from '../img/no-image.png'
import PostPreview from './next-post'
import LikesAction from './likes-action'
import { AppContext } from '../App'
import Bookmarked from './bookmark'

const PostCardSingle = (props) => {
     const {value} = useContext(AppContext)
     const posts = props.posts
     const createMarkup = (posts) => {
        return {__html:posts.post_content};
       }
         
    return(
<div className="tile is-parent p-0" key={posts.id}>
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

<div className='is-flex align-center is-flex-gap-md '>
<p className="is-title is-size-6 has-text-grey-lighter">
{timeDifference(posts.created_at)} - </p>
<Author id={posts.author_id}/>
</div>
<div className='is-flex align-center is-flex-gap-md'>
    <PostTag tag={posts.post_tag}/>
</div>
<div className='is-flex align-center is-flex-gap-md'>
   <PostCat cat={posts.post_cat}/>
</div>
 </header>
 {/* END POST CAPTION */}
 <div className='my-3 posts' dangerouslySetInnerHTML={createMarkup(posts)} />
 {/* post action */}
<div className='is-flex justify-between align-center actions'>
<ul className='is-flex is-flex-gap-lg align-center'>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <LikesAction post={posts} user={value.data} />
  <span className='is-size-7'>{posts.total_likes < 1 ? '0' : posts.total_likes}</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i class="fa fa-comment-o" aria-hidden="true"></i>
  <span className='is-size-7'>20 </span>
  </li>
</ul>
<li className='is-flex align-center is-flex-gap-md is-clickable'>
<Bookmarked  post={posts} user={value.data} />
  <span className='is-size-7'>Bookmark</span>
</li>
</div>
 {/* end post action */}
 <hr />
 {/* NEXT POST */}
<PostPreview id={posts.id} key={posts.id}/>
{/* PREV  POST */}
      </article>
</div>
    )
}

export default PostCardSingle;
