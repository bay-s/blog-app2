import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import akun from '../img/akun.jpg'
import NotificationList from './notification-list';

const Headers = () => {
const {value} = useContext(AppContext);

useEffect(() => {
     window.addEventListener('scroll',scrolls)
},[])


let y = window.scrollX
const header = useRef()
const scrolls = (e) => {
    let x = window.scrollY;
    const headers = header.current
    if (x > y) {
      headers.classList.add("fixed-header");
      console.log("tes");
    }else {
      headers.classList.remove("fixed-header");
      console.log("Tesss");
    }
    
y = x;
  }

  const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut()
    console.log(error);
  }

    return(
<header className='headers p-2 bg-dark' ref={header}>
<nav className=" is-flex align-center is-flex-gap-xl justify-between bg-transparent container" role="navigation" aria-label="main navigation" id='navbar-home'>
<div className="navbar-brand is-flex align-center is-flex-gap-md">
<i class="fa fa-bars text-white  is-clickable is-size-4 burger" aria-hidden="true" onClick={value.openSidebar}></i>
    <Link className="navbar-item main-title hvr-underline-from-center" to='/'>
    <h3 className='text-title is-title is-size-4 is-bold main-title '>SimpleForums</h3>
    </Link>
  </div>

     <ul className='is-flex  is-flex-gap-xl '>
        <li className='hvr-underline-from-center py-3 create'>
        {value.isLogin  ? <Link to='/dashboard/create-post' className=' has-text-white'>Create Post</Link>
        :  <Link to='/login/' className=' has-text-white'>Create Post</Link>
        }   
        </li>   
  
        {value.isLogin ?  <NotificationList /> : ''}
        {/* START DROPDOWN */}

<div class="dropdown is-right is-hoverable">
<li className={value.isLogin ? 'hvr-underline-from-center py-3 is-clickable akun' : 'hide'}>
<div className="is-flex align-center is-flex-gap-md"
>
<figure className="image is-24x24">
<img className='avatars is-rounded' src={value.data.avatar === '' ? akun : value.data.avatar } alt="IMAGES" />
</figure>
<span className='text-title '>{value.data.username}</span>
</div>
</li>
<div class="dropdown-menu fade" id="dropdown-menu" role="menu">
  <div class="dropdown-content bg-dark dropdown-contents">
    <Link className="dropdown-item  is-flex align-center is-flex-gap-md" to={`/profiles/${value.data.username}`} >
    <span className="icon"><i className="fa fa-user text-white"></i></span>
    <span className='text-white'>My Profile</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/create-post'>
    <span className="icon"><i class="fa fa-plus-square-o" aria-hidden="true"></i></span>
    <span className='text-white'>Create Post</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/index/'>
    <span className="icon"> <i class="fa fa-lock" aria-hidden="true"></i></span>
    <span className='text-white'>DashBoard</span>
    </Link>
    <Link className="dropdown-item is-flex align-center is-flex-gap-md" to='/dashboard/edit-profile'>
    <span className="icon"><i className="fa fa-cog text-white"></i></span>
    <span className='text-white'>Settings</span>
    </Link>
    <hr class="dropdown-divider" />
    <a href="#" class="dropdown-item is-flex align-center is-flex-gap-md">
    <span className="icon"><i className="fa fa-sign-out text-white"></i></span>
    <span onClick={Logout} className='text-white'>Log Out</span>
    </a>
  </div>
</div>
</div>
{/* END DROPDOWN */}
     </ul>

</nav>
</header>
    )
}

export default Headers;


