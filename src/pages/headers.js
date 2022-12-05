import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import akun from '../img/akun.jpg'

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
<nav className=" is-flex align-center is-flex-gap-xl justify-between bg-transparent container" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link className="navbar-item main-title hvr-underline-from-center" to='/'>
    <h3 className='text-title is-title is-size-4 is-bold main-title '>SimpleForums</h3>
    </Link>
  </div>

     <ul className='is-flex  is-flex-gap-xl '>
        <li className='hvr-underline-from-center py-3'>
        <Link to='/dashboard/index' className=' has-text-white'>For you</Link>
        </li>
         <li className='hvr-underline-from-center py-3'>
         <Link to='/dashboard/index' className=' has-text-white'>Following</Link>
         </li>
        <li className='hvr-underline-from-center py-3'>
        {value.isLogin  ? <Link to='/dashboard/create-post' className=' has-text-white'>Create Post</Link>
        :  <Link to='/login/' className=' has-text-white'>Create Post</Link>
        }   
        </li>   
        
        <li className={value.isLogin ? 'hvr-underline-from-center py-3' : 'hide'}><Link to='/dashboard/index' className=' has-text-white'>Dashboard</Link></li>
        <li className='hvr-underline-from-center py-3'>
        <i class="fa fa-bell-o text-white is-size-5" aria-hidden="true"></i>
        </li>  
        <div className={value.isLogin ? "navbar-menu fadeIn animated faster" : "hide"} id="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
              <a className="navbar-link is-arrowless is-flex is-flex-gap-lg">
              <figure class="image is-24x24">
                  <img className='avatars is-rounded' src={value.data.avatar === '' ? akun : value.data.avatar } alt="IMAGES" />
              </figure>
                <div className="is-user-name text-title"><span>{value.data.username}</span></div>
              </a>
              <div className="navbar-dropdown bg-dark">
              <Link className="navbar-item" to={`/profiles/${value.data.username}`} >
                  <span className="icon"><i className="fa fa-user text-white"></i></span>
                  <span className='text-white'>My Profile</span>
              </Link>
                <Link className="navbar-item" to='/dashboard/edit-profile'>
                  <span className="icon"><i className="fa fa-cog text-white"></i></span>
                  <span className='text-white'>Settings</span>
                </Link>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  <span className="icon"><i className="fa fa-sign-out text-white"></i></span>
                  <span onClick={Logout} className='text-white'>Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>

     </ul>

</nav>
</header>
    )
}

export default Headers;


