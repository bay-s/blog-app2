import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../App'
import supabase from '../supabase-config'
import ErrorMessage from './error-message'


const UploadMedia = (props) => {
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
   const image = useRef(null)
   const upload = useRef(null)
   const [selectValue,setSelectValue] = useState('')

   useEffect(() => {
    getStorageImage()
    getPublicUrls ()
   },[])

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
                isUpload:true
                 })
        }
      }

 const openTabs = (e) => {
    setSelectValue(e.target.value) 
    if(e.target.value === 'images') {
    upload.current.classList.add('hide')
    image.current.classList.remove('hide')
    }else{
     upload.current.classList.remove('hide')
    image.current.classList.add('hide')
    }
 } 

 const getStorageImage = async () => {
  const { data, error } = await supabase
  .storage
  .from('images')
  .list('public', {
    limit: 100,
    offset: 0,
  })
  if(data){
console.log(data);
    setImages({...images ,
        media:data
       })
  }
  if(error) console.log(error);
 }

 const getPublicUrls = (url) => {
  const { data } = supabase
  .storage
  .from('images')
  .getPublicUrl(`public/${url}`)
  if(data){
    return data.publicUrl
  }
 }


    return(
<div className="modal-card">
 <header className="modal-card-head is-flex justify-between p-2">
 <div className="select is-link is-normal">
 <select 
        value={selectValue} 
        onChange={openTabs} 
      >
    <option value='images'>Images</option>
    <option value='upload'>Upload</option>
  </select>
</div>
<button className="delete" aria-label="close" onClick={props.openModal}></button>
</header>
        {/* START MODAL CONTENT */}
        <section className="modal-card-body">
        {/* UPLOAD TAB */}
<section className='hide' ref={upload}>
<form className="file has-name is-boxed is-centered is-info is-flex is-flex-column is-flex-gap-md" onSubmit={uploadImage}>
  <label className="file-label">
    <input className="file-input" type="file" name="resume" onChange={ImageChange} />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fa fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
    <span className="file-name">
     {images.imgName}
    </span>
  </label>
<div className={images.hide ? "" : 'hide'} >
{images.isUpload ?  <button type='submit' className="button is-info " >Save</button> : <button class="button is-link is-loading is-small" disabled>Loading</button>}
</div>
<ErrorMessage pesan={images.pesan} error={images.error} sukses={images.sukses}/>
</form>  
</section>
{/* END UPLOAD TAB */}
{/* IMAGES TAB */}
<section className='' ref={image}>
{/* STARTIMAGE SELECTION */}
<div className='is-flex align-center is-flex-gap-md'>
     {images.media.length < 1 ? "" : images.media.map(img => {
      return  <figure class="image is-128x128 is-clickable" tabindex="-1" id='image-media'>
  <img  src={getPublicUrls(img.name)} className='h-100 w-100 media' onClick={props.selectImage}/>
</figure>
     })}
</div>
{/* END IMAGE SELECTION */}
         </section>
{/*END IMAGE TABS  */}
        </section>
        {/* END MODAL CONTENT */}
        <footer className="modal-card-foot p-2">
         <form onSubmit={props.saveImage} className='navbar-end'><button className="button is-info is-small">Set featured image</button></form>
        </footer>
      </div>
    )
}



export default UploadMedia ;

