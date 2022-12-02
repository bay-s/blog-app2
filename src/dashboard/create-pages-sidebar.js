import React, { useEffect, useRef, useState } from 'react'

const PagesSidebar = (props) => {
    const [active,setActive] = useState(false)
    const images = useRef(null)

    const openCollapse = (e) => {
     e.preventDefault()
     const collapse= e.target.parentElement.parentElement
     setActive(!active);
     collapse.classList.toggle('is-active')
    }
 
     return(
 <aside className='is-flex is-flex-column is-flex-gap-md '>
 <section class="accordions">
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

export default PagesSidebar ;