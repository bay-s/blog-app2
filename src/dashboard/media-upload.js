import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import ErrorMessage from './error-message'



const MediaUpload = (props) => {
    const {value} = useContext(AppContext)
    const [images,setImages] = useState({
        imgName:'',
        url:'',
        imgUpload:'',
        isUpload:false,
        hide:false,
        error:false,
        sukses:false,
        pesan:'',
        media:[],
        media_url:[]
    })

   const  ImageChange = event => {
        console.log(event.target.files);
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          const randName =  (Math.random() + 1).toString(36).substring(3);
          const imgStr = img.name.split(".")
          setImages({...images ,
            imgUpload: URL.createObjectURL(img),
            url:img,
            hide:true,
            isUpload:true,
            imgName:`${randName}.${imgStr[1]}`
             })
          }
   
      };

 const uploadImage = async e => {
        e.preventDefault()
        setImages({...images ,
            isUpload:false
             })
        const { data, error} = await supabase.storage
        .from('images')
        .upload(`public/${images.imgName}`, images.url,{
          cacheControl: '604800',
          upsert: false
        })
        if(error){
            console.log(error);
            setImages({...images ,
                isUpload:true,
                error:true,
                sukses:false,
                pesan:`Something wrong ${error.message}`
                 })
        }
        if(data){
            console.log(data);
            const url = data.Key
            setImages({...images ,
              isUpload:true,
              error:true,
              sukses:false,
              pesan:`Upload success`
                 })
             window.location.reload()
        }
      }

    return(
<div className='box bg-dark border-primary mb-4'>

<span class="justify-center mx-auto text-white py-2">
  Upload images here
</span>
 <span class="modal-close is-large text-white is-clickable" aria-label="close" onClick={props.openTabs}></span>

<form class="file has-name is-boxed is-info is-flex is-flex-column is-flex-gap-md" onSubmit={uploadImage}>
  <label class="file-label">
    <input class="file-input" type="file" name="resume" onChange={ImageChange} />
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
    <span className={images.imgName === '' ? 'hide' :"p-2 text-center is-title is-italic border-primary text-white is-centered w-100"}>
    {images.imgName}
    </span>
  </label>
<div className={images.hide ? "" : 'hide'} >
{images.isUpload ?  <button type='submit' class="button is-info " >Save</button> : <button class="button is-link is-loading is-small" disabled>Loading</button>}
</div>
<ErrorMessage pesan={images.pesan} error={images.error} sukses={images.sukses}/>
</form>
{/* END FORM */}
</div>
    )
}



export default MediaUpload;

