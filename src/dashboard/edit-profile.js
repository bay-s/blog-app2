import React, { useEffect, useRef, useState } from 'react'
import Header from '../pages/header';
import EditProfileForm from './edit-profile-form';
import Sidebar from './sidebar';


const EditProfile = () => {
const [open,setOpen] = useState(false)
const active = useRef(null)
const notActive = useRef(null)

const openTabs = (e) => {
    e.preventDefault()

if(e.target.classList.contains('site')) {
    active.current.classList.remove('is-link')
    notActive.current.classList.add('is-link')
    setOpen(true)
}if(e.target.classList.contains('profile')){
    active.current.classList.add('is-link')
    notActive.current.classList.remove('is-link')
    setOpen(false)
}
}
    return(
<>
<div className='box shadow bg-dark is-flex justify-between align-center'>
<h3 className='is-bold is-title is-size-4 text-title'>
    {!open ? 'Edit Profile' : 'Edit Site info'}
</h3>
</div>
{/* END TABS PANEL */}
<EditProfileForm />

</>
    )
}


export default EditProfile;


