import React from 'react'
import { Link } from 'react-router-dom'
import timeDifference from './timestamp';
import img from '../img/no-image.png'
import Author from '../dashboard/author';
import PostTag from '../dashboard/post-tag';
import Avatar from '../dashboard/avatar';
import { useReadingTime } from "react-hook-reading-time";

const PostCard = (props) => {

   const  {
    text, // 1 min read
    minutes, // 1
    words, // 168
    time, // 0.5309090909090909
  } = useReadingTime(props.posts.post_content);
  

    return(
      <Link to={`/post/${props.posts.id}`} >
<div className="tile is-parent px-3 p-0 mb-4 ">
        <article className="tile is-child box bg-dark is-flex-gap-sm is-flex is-flex-column p-0">
        {
          props.posts.post_thumbnail ===  ''  ? 
 ""
          : 
           <div className="card-image mb-2">
            <figure className="image is-3by1">
             <Link to={`/post/${props.posts.id}`} >
             <img src={props.posts.post_thumbnail} alt="Placeholder image" className='post-image'/>
             </Link>
            </figure>
          </div> 
        } 
          {/* POST CONTENT */}
<div className='p-3 px-5 is-flex-column justify-start is-flex-gap-lg'>
           {/* AVATAR */}
<div className='is-flex align-center is-flex-gap-lg'>
<figure className="image is-32x32">
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
  <li className={props.posts.total_likes < 1 ? 'hide' : 'is-flex align-center is-flex-gap-md is-clickable'}>
  <i className="fa fa-heart-o" aria-hidden="true"></i>
  <span className='is-size-7'>{props.posts.total_likes} Likes</span>
  </li>
  <li className='is-flex align-center is-flex-gap-md is-clickable'>
  <i className="fa fa-comment-o" aria-hidden="true"></i>
  <span className='is-size-7'>{props.posts.total_comment < 1 ? 'Add a ' : props.posts.total_comment} Comment</span>
  </li>
</ul>
<ul className='is-flex is-flex-gap-sm align-center'>
<li>
<span className='is-size-7'>
{text}
</span>
</li>
<li className='is-flex align-center is-flex-gap-md is-clickable bookmark'>
  <i className="fa fa-bookmark-o" aria-hidden="true"></i>
  <span className='is-size-7'>Bookmark</span>
</li>
</ul>

</div>
 </div>
           {/* END POST CONTENT */}
            </article>
</div>
             </Link>
    )
}

export default PostCard;