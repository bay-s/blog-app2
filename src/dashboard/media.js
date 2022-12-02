import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import MediaDisplay from './media-display';
import MediaUpload from './media-upload';

const MediaLibrary = (props) => {
    const [open,setOpen] = useState(false)
    const openTabs = (e) => {
        e.preventDefault()
        setOpen(!open)
     } 
    
     const selectImage = (e) => {
        e.preventDefault()
        console.log(e.target);
        console.log(e.target.dataset.img);
        //    if(e.target.classList.contains('remove')){
        //     setValues({...values ,
        //       imgPreview:''
        //        })
        //        setIsSave(false)
        //    }else{
        //     setValues({...values ,
        //       imgPreview:e.target.src
        //        })
        //    }
      }
    return(
<>
<div className='box shadow is-flex align-center is-flex-gap-md bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Media Library</h3>
<button  className='button hvr-sweep-to-right is-outlined border-primary bg-transparent text-title is-small' onClick={ openTabs}>Add New</button>
</div>

    {/* start table */}
<section class="section is-main-section p-2">
<div className={open ? '' : 'hides' }>
<MediaUpload openTabs={openTabs}/>
</div>
{/* START MEDIA LIBRARY */}
<MediaDisplay selectImage={selectImage}/>
{/* END MEDIA LIBRARY */}
</section>
{/* end table */}
</>
    )
}

export default MediaLibrary;