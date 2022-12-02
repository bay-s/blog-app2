import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import Author from './author'



const ReplyList = (props) => {
  const {value} = useContext(AppContext)

  const deleteComment = async (e) => {
    e.preventDefault()
    const id = parseInt(e.target.dataset.target)
    const container = e.target.parentElement.parentElement.parentElement
    if(window.confirm("Are you sure want to delete this ?")){
      const { data,error } = await supabase.from('reply_comment')
       .delete()
       .eq('id', id)
       .select()
       if(data)  {
        alert("Delete success")
        postDecrement() 
        container.classList.add('hide')
      }
       if(error) alert(`Something wrong ${error.message}`)
    }
  }

  const postDecrement = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.rpc('post_inc', { x: 1, row_id: value.data.id })

  if (error) console.error(error)
  else console.log(data)
  }

  const createMarkup = (posts) => {
    return {__html:posts.reply_content};
   }
   
    return(
props.post.length < 1 ? "" : props.post.map((posts ,index) => {
return   <tr className='table-comment'>
<td class="is-checkbox-cell w-25" >
<Author id={posts.author}/>
</td>
<td class="is-image-cell w-25">
<span className='is-size-7' dangerouslySetInnerHTML={createMarkup(posts)} />
<div className='action is-flex align-center is-flex-gap-md'>
<button className='navbar-item has-text-info btn-transparent is-size-7'>Reply</button>
<button className='navbar-item has-text-danger btn-transparent is-size-7' data-target={posts.id} onClick={deleteComment}>Delete</button>
</div>
</td>
<td data-label="Author w-25">
<Link to={`/post/${posts.post_id}`} className='has-text-info is-size-7'>
    {posts.post_title}
</Link>
</td>
<td data-label="Created">
  <small class="has-text-grey is-abbr-like text-nowrap is-size-7" title= {posts.created_at}>
    {posts.created_at}
  </small>
</td>
</tr>
})        

    )
}

export default ReplyList;