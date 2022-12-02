import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../pages/header';
import Sidebar from './sidebar';
import ReactQuill from 'react-quill';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import EditPageSidebar from './edit-page-sidebar';
import module from './quill-modules';
import UploadMedia from './upload-media';
import PagesEditor from './create-page-editor';

const  CreatePage = (props) => {
  const [modal,setModal] = useState(false)
  const [isSave,setIsSave] = useState(false)
  const [values, setValues] = useState({
    excerpt:'',
    imgPreview:''
  });

const openModal = (e) => {
  e.preventDefault()
  setModal(!modal)
 }

 const selectImage = (e) => {
  e.preventDefault()
  console.log(e.target.src);
     if(e.target.classList.contains('remove')){
      setValues({...values ,
        imgPreview:''
         })
         setIsSave(false)
     }else{
      setValues({...values ,
        imgPreview:e.target.src
         })
     }
}

const saveImage = (e) => {
  e.preventDefault()
  setIsSave(true)
  setModal(!modal)
}

const data = {
  openModal,
  selectImage,
  imgPreview:values.imgPreview,
  isSave
}
    return(
<div id="app">
<Header />
<div class="container is-fluid my-5 ">
<div className='columns is-multiline'>
{/* START SIDEBAR */}
<div className='column is-2  bg-dark'>
<Sidebar />
</div>
{/* END SIDEBAR */}
{/* START COLUMN RIGHT */}
<div className='column is-10'>
<PagesEditor data={data} />
</div>
{/* END COLUMN RIGHT*/}
</div>
{/* end columns */}
</div>
{/* end container */}

{/* modal */}
<div class={modal ? "modal is-active" : "modal"}>
<div class="modal-background"></div>
<UploadMedia saveImage ={saveImage}  openModal={openModal} selectImage={selectImage}/>
<button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>
{/* end modal */}

</div>

    )
}

export default CreatePage;