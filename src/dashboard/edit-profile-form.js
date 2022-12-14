import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';
import ErrorMessage from './error-message';
import ReactQuill from 'react-quill';


const EditProfileForm = (props) => {

const {value} = useContext(AppContext)
const ref = useRef(null);

const [message,setMessage] = useState({
  pesan:'',
  error:'',
  sukses:'',
  isSubmit:false
})

const [datas,setDatas] = useState({
  username:'',
  fullname:'',
  biodata:'',
  job:'',
  education:'',
  social_link:''
})

useEffect(() => {
  setDatas({...datas,
     username:value.data.username,
     fullname:value.data.fullname,
     biodata:value.data.biodata,
     job:value.data.job,
     education:value.data.education,
     social_link:value.data.social_link
    })
},[])

const handlerChange = (e) => {
const {name,value} = e.target
if(datas.username.length < 1){
  setMessage({
    isSubmit:false
  })
}else{
  setMessage({
    isSubmit:true
  })
}
  setDatas({...datas,
      [name]:value
      })
      console.log(datas);
}

const handlerQuillChange = (e) => {
  setDatas({...datas,
    biodata:ref.current?.value
   })
};


const updateProfiles = async (e) => {
  e.preventDefault()
  setMessage({
    isSubmit:true
  })

  if(datas.social_link === ''){

  }
  else if(!isValidUrl(datas.social_link )){
    setMessage({
      pesan:`URL ARE NOT VALID URL `,
      error:true,
      sukses:false,
      isSubmit:false
    })
    return
  }

  const { data, error } = await supabase
  .from('users')
  .update({
     username:datas.username,
     fullname:datas.fullname,
     biodata:datas.biodata,
     job:datas.job,
     education:datas.education,
     social_link:datas.social_link
    })
  .eq('id',value.data.id)
  .select()
  if(data){
    setMessage({
      pesan:`Update Profile succes`,
      error:false,
      sukses:true,
      isSubmit:false
    })
  }if(error){
    setMessage({
      pesan:`Something wrong ${error.message}`,
      error:true,
      sukses:false,
      isSubmit:false
    })
  }
}

// CHECK URL 
const isValidUrl = urlString => {
	const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
}

    return(
 <div className='px-5 text-white bg-dark py-2'>
 <h3 className='is-bold is-title is-size-4 text-title pt-5 mt-4'>
 Edit Profile 
</h3>
<UploadAvatar id={value.data.uid} data={value.data}/>
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg ' onSubmit={updateProfiles}>
<div className="field">
<label className="label text-white">Email</label>
<div className="control">
<input className="input  is-link has-text-dark" type="text" name='fullname' defaultValue={value.data.email} disabled/>
</div>
</div>

<div className="field">
<label className="label text-white">Fullname</label>
<div className="control">
<input className="input  is-link has-text-dark" type="text" name='fullname' defaultValue={value.data.fullname} onChange={ handlerChange }/>
</div>
</div>

<div className="field">
<label className="label text-white">Username</label>
<div className="control">
<input className="input  is-link" type="text" name='username' defaultValue={value.data.username} onChange={ handlerChange }/>
</div>
</div>

<div className="field">
<label className="label text-white">Website</label>
<div className="control">
<input className="input  is-link" type="text" name='social_link' defaultValue={value.data.social_link} onChange={ handlerChange }/>
</div>
</div>

<div className="field">
<label className="label text-white">Biodata</label>
<div className="control biodata">
<ReactQuill ref={ref} theme="snow" value={datas.biodata} onChange={handlerQuillChange} name='quill' />
</div>
</div>

<div className="field">
<label className="label text-white">Education</label>
<div className="control">
<input className="input  is-link" type="text" name='education' defaultValue={value.data.education} onChange={ handlerChange }/>
</div>
</div>

<div className="field">
<label className="label text-white">Job</label>
<div className="control">
<input className="input  is-link" type="text" name='job' defaultValue={value.data.job} onChange={ handlerChange }/>
</div>
</div>

<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>

<div className="field">
{message.isSubmit ? <button className="button is-primary w-100" type='submit' title="Disabled button" >Submit</button> :
<button className="button is-primary w-100" title="Disabled button" disabled>Submit</button>}
</div>
 </form>
   </div>
    )
}

export default EditProfileForm;
