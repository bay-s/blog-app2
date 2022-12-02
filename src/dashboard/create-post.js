import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../pages/header';
import Sidebar from './sidebar';
import UploadMedia from './upload-media';
import PostEditor from './create-post-editor';


const CreatePostCopy = () => {
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

// const postIncrement = async () => {
//   const { updata, err }= await supabase
//   .rpc('increment_post', { x: 1, row_id: value.data.id})
//   if(updata){
//       alert("Remove likes sukes")
//       console.log(updata);
//     }if(err){
//      console.log(err);
//     }
// }

return(
<div id="app">
<Header />
<div class="container is-fluid my-5 pt-3 ">
<div className='columns is-multiline'>
{/* START SIDEBAR */}
<div className='column is-2 bg-dark'>
<Sidebar />
</div>
{/* END SIDEBAR */}
{/* START COLUMN RIGHT */}
<div className='column is-10'>
<PostEditor data={data} />
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

export default CreatePostCopy;




