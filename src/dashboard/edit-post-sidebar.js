import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config'
import UploadMedia from './upload-media'


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
<section class="accordions">
  <article class="accordion">
  <div class="accordion-header bg-darks">
      <p className='p-1'>Category</p>
      <button class="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div class="accordion-body bg-darks">
      <ul className='is-flex is-flex-column p-3'>
      {category.length < 1 ? "" : category.map((m,index) => {
        return <li>
        <label class="b-checkbox checkbox">
      <input type="checkbox" data-id={index} value={m.category} onChange={props.data.handlerChanges}  defaultChecked={m.id}/>
      <span class="check border-primary"></span>
      <span className='px-2 text-white'>{m.category}</span>
      </label>
      </li>
      })
      }
      {props.data.catArr.length < 1 ? "" : props.data.catArr.map(m => {
      return <li>
      <label class="b-checkbox checkbox">
      <input type="checkbox" value={m} onChange={props.data.handlerChanges} />
      <span class="check border-primary"></span>
      <span className='px-2 text-white' dangerouslySetInnerHTML={Card (m)} />
      </label>
      </li>
      })
      }
      </ul>
      <a href='#' className='is-size-7 text-white is-underlined p-3 ' onClick={openAddCategory}>Add New Category</a>
      <form className={openCategory ? 'p-3' : 'hide'} onSubmit={props.data.addCategory}>
      <input class="input is-info is-small mb-2 text-white bg-transparent" type="text" name='category' placeholder="Primary input" onChange={props.data.handlerChanges}/>
      <button className='button is-info is-outlined is-small'>Add New Category</button>
      </form>
    </div>
</article>
  <article class="accordion">
  <div class="accordion-header bg-darks">
      <p className='p-1'>Tags</p>
      <button class="toggle" aria-label="toggle" data-collapse='tags'  onClick={openCollapse}></button>
    </div>
    <div class="accordion-body bg-darks text-white">
  <div className='is-flex is-flex-gap-md align-center p-3 flex-wrap'>
      {props.data.tagArr.length < 1 ? "" : props.data.tagArr.map((m,index) => {
        return <div className='is-flex align-center tag is-info' key={index} data-index={index}>
  <span dangerouslySetInnerHTML={Card (m)} />
   <span class="delete is-small is-clickable" onClick={props.data.removeTagArr}></span>
  </div>
      })
      }


      </div>
      <div className='p-3'>
      <input class="input is-info is-small mb-2 bg-transparent text-white" type="text" name='tags' placeholder="Primary input" onChange={props.data.handlerChanges}/>
      <button className='button  is-info is-outlined is-small' onClick={props.data.addTags}>Add Tags</button>
      </div>
    </div>
  </article>
  <article class="accordion">
  <div class="accordion-header bg-darks">
      <p className='p-1'>Features Image</p>
      <button class="toggle" aria-label="toggle" data-collapse='images'  onClick={openCollapse}></button>
   </div>
    <div class="accordion-body bg-darks is-flex is-flex-column is-flex-gap-md">
    <button className='button is-large text-center p-5 w-100' onClick={props.data.openModal}>
      Features Image
    </button>
{/*  IMAGE ATTACHMENT  */}
<div className='is-flex is-flex-column is-flex-gap-lg p-2' key={props.data.imgPreview} ref={props.data.imagesRef} >
<figure class={props.post.post_thumbnail == null  ? 'hide' : "image is-128x128 mx-auto"} tabIndex="-1" id='image-media'>
  <img  src={props.data.imgPreview !== '' ? props.data.imgPreview : props.post.post_thumbnail } className='h-100 w-100 media' />
</figure>
{/* BUTTON REMOVE */}
<div className={props.post.post_thumbnail == null  ? 'hide' : ''}>
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

export default EditPostSidebar;