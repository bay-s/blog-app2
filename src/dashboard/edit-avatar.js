import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import akun from '../img/akun.jpg'
import supabase from '../supabase-config'

const EditAvatar = (props) => {
   const {value} = useContext(AppContext)
   const [images,setImages] = useState({
    hide:false,
    isUpload:false,
    imgUpload:'',
    url:'',
    name:'',
    isValid:false,
    imgName:''
   })

  
const ImageChange = event => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const randName =  (Math.random() + 1).toString(36).substring(3);
      const imgStr = img.name.split(".")
      setImages({...images ,
        imgUpload: URL.createObjectURL(img),
        url:img,
        name:img.name,
        hide:true,
        isUpload:true,
        imgName:`${randName}.${imgStr[1]}`
         })
         console.log(images.url);
      }


  };

const uploadImage = async e => {
    e.preventDefault()
    setImages({...images ,
      isUpload:false
       })
    const { data, error} = await supabase.storage
    .from('avatar')
    .upload(`public/avatar/${images.imgName}`, images.url,{
      cacheControl: '604800',
      upsert: false
    })
    if(error){
        console.log(error); 
       alert(`Something wrong ${error.message}`)
    }
    if(data){
        console.log(data);
        console.log(data.path);
        const url = data.path
        setImages({...images ,
          isUpload:true
           })
        getURL(url)
    }
  }

const getURL = async (url) => {
  const { data } = supabase.storage.from('avatar')
  .getPublicUrl(url)
  if(data){
    const imgUrl= data.publicUrl;
    updateAvatar(imgUrl) 
  }

}

  const updateAvatar = async (url) => {
    const {data,err} = await supabase 
    .from('user')
    .update({avatar:url})
    .eq('uid',value.data.uid)
    .select()
    if(err){
      console.log(err);
alert(`Something wrong ${err.message}`)
    }
    if(data){
   console.log(data);
    alert('Uploaded succcess')
    window.location.reload()
    }
  }

      return(
        <form className='my-3' onSubmit={uploadImage}>
        <div class="field is-flex is-flex-gap-xl is-align-items-center">
        <figure class="image is-48x48">
        <img class="is-rounded edit-image h-100" src={images.imgUpload !== '' ? images.imgUpload : value.data.avatar === '' ? akun : value.data.avatar}  alt="profile"/>
        </figure>
        <div class="file is-small  is-flex is-flex-direction-column is-flex-gap-sm">
        <label class="label p-0 m-0 text-white">{value.data.username}</label>
        <label class="file-label">
        <input class="file-input" type="file" name="resume" onChange={ImageChange}/>
        <span class="file-cta">
        <span class="file-icon">
        <i class="fa fa-upload"></i>
        </span>
        <span class="file-label  px-2">
        {images.name === '' ? "Upload Image" : images.name}
        </span>
        </span>
  
        </label>
        <div className={images.hide ? "" : 'hide'} >
        {images.isUpload ?  <button type='submit' class="button is-info is-small" >Save</button> : <button class="button is-link  is-loading is-small" disabled>Loading</button>}
        </div>
        </div>
        </div>
        </form>
                )
}

export default  EditAvatar;