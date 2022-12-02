import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import supabase from '../supabase-config';
import UploadAvatar from './edit-avatar.js';
import ErrorMessage from './error-message';

const EditProfileForm = (props) => {
const {value} = useContext(AppContext)
const [message,setMessage] = useState({
  pesan:'',
  error:'',
  sukses:'',
  isSubmit:false
})
const [datas,setDatas] = useState({
  username:'',
  fullname:''
})
console.log(value);
useEffect(() => {
  setDatas({...datas,
     username:value.data.username,
     fullname:value.data.fullname
    })
},[])
const handlerChange = (e) => {
  const {name,value} = e.target
  console.log(datas.fullname);
  console.log(datas.username);
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
}
const updateProfiles = async (e) => {
  e.preventDefault()
  setMessage({
    isSubmit:true
  })
console.log(value);
  const { data, error } = await supabase
  .from('users')
  .update({
     username:datas.username,
     fullname:datas.fullname
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
    return(
 <div className='px-5 text-white bg-dark py-2'>
<UploadAvatar id={value.data.uid} data={value.data}/>
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg ' onSubmit={updateProfiles}>
<div class="field">
<label class="label text-white">Fullname</label>
<div class="control">
<input class="input  is-link has-text-dark" type="text" name='fullname' defaultValue={value.data.fullname} onChange={ handlerChange }/>
</div>
</div>

<div class="field">
<label class="label text-white">Username</label>
<div class="control">
<input class="input  is-link" type="text" name='username' defaultValue={value.data.username} onChange={ handlerChange }/>
</div>
</div>

<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>

<div class="field">
{message.isSubmit ? <button class="button is-info" type='submit' title="Disabled button" >Submit</button> :
<button class="button is-info" title="Disabled button" disabled>Submit</button>}
</div>
 </form>
   </div>
    )
}

export default EditProfileForm;
