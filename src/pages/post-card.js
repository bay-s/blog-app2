import React from 'react'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp';
import img from '../img/no-image.png'
import Author from '../dashboard/author';
import PostTag from '../dashboard/post-tag';
import Avatar from '../dashboard/avatar';

const PostCard = (props) => {

    return(
      <Link to={`/post/${props.posts.id}`} >
<div className="tile is-parent px-3 p-0 mb-4 ">
        <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column p-0">
        {
          props.posts.post_thumbnail !==  ''  ? 
         <div className="card-image mb-2">
            <figure className="image is-3by1">
             <Link to={`/post/${props.posts.id}`} >
             <img src={props.posts.post_thumbnail} alt="Placeholder image" className='post-image'/>
             </Link>
            </figure>
          </div> 
          : ''
        } 
          {/* POST CONTENT */}
<div className='p-3 px-5 is-flex-column justify-start is-flex-gap-lg'>
           {/* AVATAR */}
<div className='is-flex align-center is-flex-gap-lg'>
<figure class="image is-32x32">
<Avatar  id={props.posts.author_id}/>
</figure>
<div className='is-flex-column'>
<Author id={props.posts.author_id}/>
<p className="subtitle is-7 has-text-grey">{timeDifference(props.posts.created_at)}</p>
</div>
</div>
 {/* END AVATAR */}
<div>
<p className="title is-4 is-bold"><Link to={`/post/${props.posts.id}`} className='text-title'>{props.posts.post_title}</Link></p>
<div className='is-flex align-center is-flex-gap-md'>
  <PostTag tag={props.posts.post_tag}/>
</div>
</div>

<div className='is-flex justify-between align-center actions'>
<ul className='is-flex is-flex-gap-lg align-center'>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i class="fa fa-heart-o" aria-hidden="true"></i>
  <span className='is-size-7'>30 Likes</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i class="fa fa-comment-o" aria-hidden="true"></i>
  <span className='is-size-7'>20 Comment</span>
  </li>
</ul>
<li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i class="fa fa-bookmark-o" aria-hidden="true"></i>
  <span className='is-size-7'>20 Comment</span>
</li>
</div>
 </div>
           {/* END POST CONTENT */}
            </article>
</div>
             </Link>
    )
}

export default PostCard;