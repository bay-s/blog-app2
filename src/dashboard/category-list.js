import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import supabase from '../supabase-config';


const CategoryList = (props) => {
    const [category,setCategory] = useState([])

    useEffect(() => {
   const fetchCategory = async () => {
    const { data, error } = await supabase
    .from('category')
    .select()
    if(data){
      console.log(data);
      setCategory(data)
    }if(error) console.log(error);
   }
   fetchCategory()
    },[])
    
    const deleteCategory = async (e) => {
      e.preventDefault()
      const id = parseInt(e.target.dataset.target)
      console.log(id);
      if(window.confirm("Are you sure want to delete this post ?")){
        const { data,error } = await supabase.from('category')
         .delete()
         .eq('id', id)
         .select()
         if(data)  {
          alert("Delete post success")
          window.location.reload()
        }
         if(error) alert(`Something wrong ${error.message}`)
      }


    }
  
    const catList = category.length < 1 ? "" : category.map((cat,index) => {
        return  <tr>
        <td class="is-checkbox-cell">
  {index + 1}
        </td>
        <td class="is-image-cell">
        </td>
        <td data-label="Name">
        <Link to={`/posts/category-name/${cat.category}`}>{cat.category}</Link>
        </td>
        <td class="is-actions-cell">
          <div class="buttons is-right">
          <i class="fa fa-trash has-text-danger is-size-5 is-clickable" data-target={cat.id} onClick={deleteCategory}></i>
          </div>
        </td>
        </tr>
    })
    return(
        <div class="table-wrapper has-mobile-cards">
        <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th class="is-checkbox-cell">
      #
            </th>
            <th></th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
{/* POST LIST */}
{catList}
{/* END POST LIST */}
          </tbody>
        </table>
</div>
    )
}

export default CategoryList;