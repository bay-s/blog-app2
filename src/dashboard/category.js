import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config';
import CategoryList from './category-list';


const Category = () => {
    const [text,setText] = useState('')
     const addCategory = async (e) => {
        e.preventDefault()
        if(!text){
          alert("Input cant be empty")
          console.log("Tes");
          return
        }
        const {data,err} = await supabase.from('category')
        .insert([{category:text.text}])
        .select()
        if(err) alert(`Something wrong ${err.message}`)
        if(data)  {
            alert('Add category success')
            window.location.reload()
        }
       }

       const handlerChanges = (e) => {
        const {name,value} = e.target
        setText({[name]:value})
        console.log(text);
       }
    return(
<>
<div className='box shadow bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Category</h3>
</div>
{/* END HEADER COLUMN */}
<div className='is-flex is-flex-gap-md px-2 sidebar-container'>
<form className='column is-3 box' onSubmit={addCategory}>
 <div class="field">
  <label class="label is-bold">Add New Category</label>
    <input class="input is-info" type="text" placeholder="Text input" name='text' onChange={handlerChanges }/>
</div>
<button type='submit' className='button is-info is-small'>Add new category</button> 
 </form>
 {/* CATEGORY TABLE */}
 <div className='w-100'>
<CategoryList />
 </div>
 {/* END TABLE CATEGORY */}
</div>
{/* END MENUS CONTAINER */}
</>
    )
}

export default Category;





