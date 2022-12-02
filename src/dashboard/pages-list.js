import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import Author from './author'

const PagesList = (props) => {
  const {value} = useContext(AppContext)
  const deletePages = async (e) => {
    e.preventDefault()
    const id = parseInt(e.target.dataset.target)
    console.log(id);
    if(window.confirm("Are you sure want to delete this post ?")){
      const { data,error } = await supabase.from('pages')
       .delete()
       .eq('id', id)
       .select()
       if(data)  {
        alert("Delete post success")
        decrementPages()
        window.location.reload()
      }
       if(error) alert(`Something wrong ${error.message}`)
    }
  }

  const decrementPages = async () => {
    const { data, error } = await supabase
    .rpc('decrementpages', { x: 1, row_id:value.data.id })
    if(error) console.log(error.message);
    else console.log(data);
   }
    return(
props.post.length < 1 ? "" : props.post.map((posts,index) => {
return   <tr>
<td class="is-checkbox-cell">
{index + 1}
</td>
<td class="is-image-cell">
</td>
<td data-label="Name">
<Link to={`/dashboard/edit-page/${posts.id}`}>{posts.pages_title}</Link>
</td>
<td data-label="Company">
<Author id={posts.author_id}/>
</td>
<td data-label="Created">
  <small class="has-text-grey is-abbr-like is-size-7" title= {posts.created_at}>
    {posts.created_at}
  </small>
</td>
<td class="is-actions-cell">
  <div class="buttons is-right">
    <i class="fa fa-trash has-text-danger is-size-5 is-clickable" data-target={posts.id} onClick={deletePages}></i>
  </div>
</td>
</tr>
})        

    )
}

export default PagesList;