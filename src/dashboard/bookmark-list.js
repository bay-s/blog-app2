import React from 'react'
import { Link } from 'react-router-dom'
import joinTime from '../pages/join_time'
import Author from './author'
import Avatar from './avatar'


const BookmarkList = (props) => {
    const posts = props.post
    console.log(posts);
    return(
    <tr className=' box bg-dark align-center justify-between'>
        <td class="is-checkbox-cell w-25" >
        <Link  to={`/post/${posts.id}`}  className='is-size-6 text-title'>{posts.post_title}</Link>
        </td>
        <td class="is-image-cell w-25">
        <div className='is-flex justify-between align-center actions'>
        <ul className='is-flex is-flex-gap-lg align-center'>
          <li className='is-flex align-center is-flex-gap-md '>
          <i className="fa fa-heart-o text-white" ></i> 
          <span className='is-size-7 text-white'>{posts.total_likes < 1 ? '0' : posts.total_likes}</span>
          </li>
          <li className='is-flex align-center is-flex-gap-md '>
          <i class="fa fa-comment-o text-white" aria-hidden="true"></i>
          <span className='is-size-7 text-white'>{posts.total_comment < 1 ? "0" : posts.total_comment}</span>
          </li>
        </ul>
        </div>
        </td>
        <td data-label="Author w-25">
        <small class="text-white  is-abbr-like text-nowrap is-size-6" title= {posts.created_at}>
            {joinTime(posts.created_at)}
        </small>
        </td>
        <td>
<div className='is-flex align-center is-flex-gap-lg'>
<figure class="image is-32x32">
<Avatar  id={posts.author_id}/>
</figure>
<div className='is-flex-column'>
<Author id={posts.author_id}/>
</div>
</div>
 {/* END AVATAR */}
        </td>
    </tr>
    )
}

export default BookmarkList