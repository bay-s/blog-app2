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

<EditProfileForm />

    )
}


export default EditProfile;


