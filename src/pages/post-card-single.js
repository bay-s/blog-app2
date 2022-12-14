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
import Avatar from '../dashboard/avatar'

const PostCardSingle = (props) => {
     const {value} = useContext(AppContext)
     const posts = props.posts
     const createMarkup = (posts) => {
        return {__html:posts.post_content};
       }
         
return(
<div className="tile is-parent p-0">
 <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column p-0 post-single">
       {posts.post_thumbnail !== '' ? 
<div className="card-image mb-2 feature-image-container">
<figure className="image is-16by9 feature-image" >
  <img src={posts.post_thumbnail} alt="Placeholder image" className='post-image w-100 h-100'/>
</figure> 
</div>
: ''
  }
{/* POST CAPTION */}
<header className='is-flex is-flex-column is-flex-gap-md px-6'>

<div className='py-3 p-0  is-flex-column justify-start is-flex-gap-lg'>
 {/* AVATAR */}
<div className='is-flex align-center is-flex-gap-lg'>
<figure className="image is-32x32">
<Avatar  id={posts.author_id}/>
</figure>
<div className='is-flex-column'>
<Author id={posts.author_id}/>
<p className="subtitle is-7 has-text-grey">{timeDifference(posts.created_at)}</p>
</div>
</div>
 {/* END AVATAR */}
</div>

<p className="title is-3 text-title is-bold p-0 m-0 ">{posts.post_title}</p>

<div className='is-flex align-center is-flex-gap-md'>
    <PostTag tag={posts.post_tag}/>
</div>
<div className='is-flex align-center is-flex-gap-md'>
   <PostCat cat={posts.post_cat}/>
</div>
 </header>
 {/* END POST CAPTION */}
 <div className='my-3 posts px-6' dangerouslySetInnerHTML={createMarkup(posts)} />
 {/* post action */}
<div className='is-flex justify-between align-center actions px-5'>
<ul className='is-flex is-flex-gap-lg align-center'>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <LikesAction post={posts} user={value.data}  isLogin={value.isLogin} />
  <span className='is-size-7'>{posts.total_likes < 1 ? '0' : posts.total_likes}</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i className="fa fa-comment-o" aria-hidden="true"></i>
  <span className='is-size-7'>20 </span>
  </li>
</ul>
<li className='is-flex align-center is-flex-gap-md is-clickable'>
<Bookmarked  post={posts} user={value.data} isLogin={value.isLogin}/>
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
