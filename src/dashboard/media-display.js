import React, { useContext, useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config'



const MediaDisplay  = (props) => {
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
<div className='box p-1 bg-dark shadow '>
<section className='is-flex align-center is-flex-gap-md media-container border-primary p-3' ref={image}>
{/* STARTIMAGE SELECTION */}
     {images.media.length < 1 ? "" : images.media.map(img => {
      return  <figure class="image is-128x128 is-clickable" tabindex="-1" id='image-media'>
  <img  src={getPublicUrls(img.name)} className='h-100 w-100 media' onClick={props.selectImage}/>
</figure>
     })}
{/* END IMAGE SELECTION */}
 </section>
{/*END IMAGE TABS  */}
</div>
    )
}



export default MediaDisplay ;

