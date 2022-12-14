import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config'



const EditPostSidebar = (props) => {
   const [active,setActive] = useState(false)
   const [openCategory,setOpenCategory] = useState(false)
   const [category,setCategory] = useState([])
   useEffect(() => {
    getCategory()
   },[])
   const openCollapse = (e) => {
    e.preventDefault()
    const collapse= e.target.parentElement.parentElement
    setActive(!active);
    collapse.classList.toggle('is-active')
   }

   const openAddCategory = (e) => {
    e.preventDefault()
    setOpenCategory(!openCategory)
   }
  
   const Card = (category) => {
    return  {__html:category}
   }
   
   const getCategory = async () => {
  const { data, error } = await supabase
  .from('category')
  .select()
  if(data){
    setCategory(data)
  }if(error) console.log(error.message);
   }


    return(
<aside className='is-flex is-flex-column is-flex-gap-md '>
<section className="accordions">
  <article className="accordion">
  <div className="accordion-header bg-darks">
      <p className='p-1'>Category</p>
      <button class="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div class="accordion-body bg-darks">
      <ul className='is-flex is-flex-column p-3'>
      {category.length < 1 ? "" : category.map((m,index) => {
        return <li>
        <label className="b-checkbox checkbox">
      <input type="checkbox" data-id={index} value={m.category} onChange={props.data.handlerChanges}  defaultChecked={m.id}/>
      <span className="check border-primary"></span>
      <span className='px-2 text-white'>{m.category}</span>
      </label>
      </li>
      })
      }
      {props.data.catArr.length < 1 ? "" : props.data.catArr.map(m => {
      return <li>
      <label className="b-checkbox checkbox">
      <input type="checkbox" value={m} onChange={props.data.handlerChanges} />
      <span className="check border-primary"></span>
      <span className='px-2 text-white' dangerouslySetInnerHTML={Card (m)} />
      </label>
      </li>
      })
      }
      </ul>
      <a href='#' className='is-size-7 text-white is-underlined p-3 ' onClick={openAddCategory}>Add New Category</a>
      <form className={openCategory ? 'p-3' : 'hide'} onSubmit={props.data.addCategory}>
      <input className="input is-info is-small mb-2 text-white bg-transparent" type="text" name='category' placeholder="Primary input" onChange={props.data.handlerChanges}/>
      <button className='button is-info is-outlined is-small'>Add New Category</button>
      </form>
    </div>
</article>
  <article className="accordion">
  <div className="accordion-header bg-darks">
      <p className='p-1'>Tags</p>
      <button className="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div className="accordion-body bg-darks text-white">
  <div className='is-flex is-flex-gap-md align-center p-3 flex-wrap'>
      {props.data.tagArr.length < 1 ? "" : props.data.tagArr.map((m,index) => {
        return <div className='is-flex align-center tag is-info' key={index} data-index={index}>
  <span dangerouslySetInnerHTML={Card (m)} />
   <span className="delete is-small is-clickable" onClick={props.data.removeTagArr}></span>
  </div>
      })
      }


      </div>
      <div className='p-3'>
      <input className="input is-info is-small mb-2 bg-transparent text-white" type="text" name='tags' placeholder="Primary input" onChange={props.data.handlerChanges}/>
      <button className='button  is-info is-outlined is-small' onClick={props.data.addTags}>Add Tags</button>
      </div>
    </div>
  </article>

</section>

</aside>
    )
}

export default EditPostSidebar;