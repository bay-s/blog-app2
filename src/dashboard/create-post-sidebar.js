import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config'


const PostSidebar = (props) => {
   const [active,setActive] = useState(false)
   const [openCategory,setOpenCategory] = useState(false)
   const [category,setCategory] = useState([])
   const images = useRef(null)
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
    console.log(data);
    setCategory(data)
  }if(error) console.log(error.message);
   }

    return(
<aside className='is-flex is-flex-column is-flex-gap-md '>
<section class="accordions">
  <article class="accordion">
  <div class="accordion-header bg-darks shadow">
      <p className='p-1'>Category</p>
      <button class="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div class="accordion-body bg-darks shadow">
      <ul className='is-flex is-flex-column p-3'>
      {category.length < 1 ? "" : category.map((m,index) => {
      return <li>
      <label class="b-checkbox checkbox">
      <input type="checkbox" value={m.category} onChange={props.methods.handlerChanges} />
      <span class="check border-primary"></span>
      <span className='px-2 text-white' dangerouslySetInnerHTML={Card (m.category)} />
      </label>
      </li>
      })
      }

{props.methods.catArr.length < 1 ? "" : props.methods.catArr.map(m => {
      return <li>
      <label class="checkbox">
  <input type="checkbox" className='border-primary' value={m} onChange={props.methods.handlerChanges} />
  <span className='px-2 text-white'>{m.category}</span>
</label>
      </li>
      })
      }
      
      </ul>
      <a href='#' className='is-size-7 text-white is-underlined p-3 ' onClick={openAddCategory}>Add New Category</a>
      <form className={openCategory ? 'p-3' : 'hide'} onSubmit={props.methods.addCategory}>
      <input class="input is-info is-small mb-2 text-white bg-transparent" type="text" name='category' placeholder="Primary input" onChange={props.methods.handlerChanges}/>
      <button className='button is-info is-outlined is-small'>Add New Category</button>
      </form>
    </div>
</article>
  <article class="accordion">
  <div class="accordion-header bg-darks ">
      <p className='p-1'>Tags</p>
      <button class="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div class="accordion-body bg-darks text-white">
  <div className='is-flex is-flex-gap-md align-center p-3 flex-wrap'>
      {props.methods.tagArr.length < 1 ? "" : props.methods.tagArr.map((m,index) => {
        console.log(m)
        return <div className='is-flex align-center tag is-info' key={index} data-index={index}>
  <span dangerouslySetInnerHTML={Card (m)} />
   <span class="delete is-small is-clickable" onClick={props.methods.removeTagArr}></span>
  </div>
      })
      }

      </div>
      <div className='p-3'>
      <input class="input is-info is-small mb-2 bg-transparent text-white" type="text" name='tags' placeholder="Primary input" onChange={props.methods.handlerChanges}/>
      <button className='button  is-info is-outlined is-small' onClick={props.methods.addTags}>Add Tags</button>
      </div>
    </div>
  </article>
  <article class="accordion">
  <div class="accordion-header bg-darks ">
      <p className='p-1'>Features Image</p>
      <button class="toggle" aria-label="toggle" data-collapse='images'  onClick={openCollapse}></button>
   </div>
    <div class="accordion-body bg-dark is-flex is-flex-column is-flex-gap-md bg-darks ">
    <button className='button is-large text-center p-5 w-100' onClick={props.data.openModal}>
      Features Image
    </button>
{/*  IMAGE ATTACHMENT  */}
<div className='is-flex is-flex-column is-flex-gap-lg p-2' key={props.data.imgPreview}>
<figure class={!props.data.isSave  ? 'hide' : "image is-128x128 mx-auto"} tabIndex="-1" id='image-media' ref={images } >
  <img  src={props.data.imgPreview} className='h-100 w-100 media' />
</figure>
{/* BUTTON REMOVE */}
<div className={!props.data.isSave  ? 'hide' : ''}>
<button className='button is-info is-outlined is-small navbar-start text-white' onClick={props.data.openModal}>Replace Image</button>
<span className='is-clickable has-text-danger is-underlined is-size-7 remove' onClick={props.data.selectImage}>Remove Featured images</span>
</div>
{/* END BUTTON ACTION */}
</div>
{/* END IMAGE ATTACHMENT */}
    </div>
  </article>
</section>

</aside>
    )
}

export default PostSidebar;