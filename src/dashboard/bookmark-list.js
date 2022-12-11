import React from 'react'
import { Link } from 'react-router-dom'
import joinTime from '../pages/join_time'
import supabase from '../supabase-config'
import Author from './author'
import Avatar from './avatar'


const BookmarkList = (props) => {
    const posts = props.post

    const deletePost = async (e) => {
        e.preventDefault()
        const id = parseInt(e.target.dataset.target)
        const container = e.target.parentElement.parentElement
        if(window.confirm("Are you sure want to delete this  ?")){
          const { data,error } = await supabase.from('posts')
           .delete()
           .eq('id', id)
           .select()
           if(data)  {
            alert("Delete post success")
            container.classList.add('hide')
          }
           if(error) alert(`Something wrong ${error.message}`)
        }
      }
    return(
    <tr className=' box bg-dark align-center justify-between'>
        <td className="is-checkbox-cell w-25" >
        <Link  to={`/post/${posts.id}`}  className='is-size-6 text-title'>{posts.post_title}</Link>
        </td>
        <td className="is-image-cell w-25">
        <div className='is-flex justify-between align-center actions'>
        <ul className='is-flex is-flex-gap-lg align-center'>
          <li className='is-flex align-center is-flex-gap-md '>
          <i className="fa fa-heart-o text-white" ></i> 
          <span className='is-size-7 text-white'>{posts.total_likes < 1 ? '0' : posts.total_likes}</span>
          </li>
          <li className='is-flex align-center is-flex-gap-md '>
          <i className="fa fa-comment-o text-white" aria-hidden="true"></i>
          <span className='is-size-7 text-white'>{posts.total_comment < 1 ? "0" : posts.total_comment}</span>
          </li>
        </ul>
        </div>
        </td>
        <td data-label="Author w-25">
<div className='is-flex align-center is-flex-gap-lg'>
<figure className="image is-32x32">
<Avatar  id={posts.author_id}/>
</figure>
<div className='is-flex-column'>
<Author id={posts.author_id}/>
</div>
</div>
        </td>
        <td>
<div className="buttons is-right is-flex align-center is-flex-gap-lg">
     <i className="fa fa-trash has-text-danger is-size-5 is-clickable" data-target={posts.id} type="button" onClick={deletePost }></i>
  </div>
        </td>
    </tr>
    )
}

export default BookmarkList