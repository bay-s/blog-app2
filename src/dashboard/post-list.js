import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import Author from './author'
import PostCat from './post-cat'
import PostTag from './post-tag'


const PostList = (props) => {
  const {value} = useContext(AppContext)
  const deletePost = async (e) => {
    e.preventDefault()
    const id = parseInt(e.target.dataset.target)
    console.log(id);
    if(window.confirm("Are you sure want to delete this post ?")){
      const { data,error } = await supabase.from('posts')
       .delete()
       .eq('id', id)
       .select()
       if(data)  {
        alert("Delete post success")
        decrementPosts() 
        window.location.reload()
      }
       if(error) alert(`Something wrong ${error.message}`)
    }
  }

  const decrementPosts = async () => {
    const { data, error } = await supabase
    .rpc('decrement', { x: 1, row_id:value.data.id })
    if(error) console.log(error.message);
    else console.log(data);
   }
    return(
props.post.length < 1 ? "" : props.post.map((posts ,index) => {
return   <tr>
<td class="is-checkbox-cell">
{index + 1}
</td>
<td class="is-image-cell">
</td>
<td data-label="Title">
<Link to={`/dashboard/edit-post/${posts.id}`} className='is-size-7'>{posts.post_title}</Link>
</td>
<td data-label="Author">
<Author id={posts.author_id}/>
</td>
<td data-label="Category">
   <div className='is-flex align-center is-flex-gap-sm '>
   <PostCat cat={posts.post_cat}/>
   </div> 
</td>
<td data-label="Tags" >
<div className='is-flex align-center is-flex-gap-sm '>
<PostTag tag={posts.post_tag}/>
</div> 
</td>
<td data-label="Created">
  <small class="has-text-grey is-abbr-like text-nowrap is-size-7" title= {posts.created_at}>
    {posts.created_at}
  </small>
</td>
<td class="is-actions-cell">
  <div class="buttons is-right">
     <i class="fa fa-trash has-text-danger is-size-5 is-clickable" data-target={posts.id} type="button" onClick={deletePost }></i>
  </div>
</td>
</tr>
})        

    )
}

export default PostList;