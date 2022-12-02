import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../pages/header';
import Sidebar from './sidebar';
import ReactQuill from 'react-quill';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import UploadMedia from './upload-media';
import EditPageSidebar from './edit-page-sidebar';
import module from './quill-modules';


const EditPage = (props) => {
  const {value} = useContext(AppContext)
  const {id} = useParams()
  const [post,setPost] = useState([])
  const [modal,setModal] = useState(false)
  const [isSave,setIsSave] = useState(false)
  const [values, setValues] = useState({
      title:'',
      quill:'',
      imgPreview:'',
      imagesRef:useRef(null)
    });

   const [message,setMessage] = useState({
    pesan:'',
    isError:false,
    sukses:false
   })

    const [isSubmit,setIsSubmit] = useState(false)
    const ref = useRef(null);
    const titles = useRef(null)

useEffect(() => {
        fetchPost()
  },[])
  const fetchPost = async () => {
    const { data, error } = await supabase
    .from('pages')
    .select()
    .eq('id',id)
    if(data){
        console.log(data[0].pages_content);
      setPost(data[0])
     setValues({...values ,
            quill:data[0].pages_content,
       })
    }if(error) console.log(error);
}

const handlerChange = (e) => {
if(ref.current !== null) {
  setValues({...values ,
    title:titles.current?.value,
    quill:ref.current?.value,
     })
}
if(values.quill.length > 0){
  setIsSubmit(true)
}else{
  setIsSubmit(false)
}
    }

const updatePost = async (e) => {
  setIsSubmit(true)
  e.preventDefault()
  console.log("Test");
  if(!values.title || !values.quill){
    setMessage({
      pesan:`Input Value Required`,
      isError:true,
      sukses:false
    })
    return
  }

  const { data, error } = await supabase
  .from('pages')
  .update({
    pages_title:values.title,
    pages_content:values.quill,
    pages_thumbnail:values.imgPreview,
    author_id:value.data.uid 
  })
  .select()
  .eq('id',id)
  if(data){
    console.log(data);
    setMessage({
      pesan:`Edit  Post Success`,
      isError:false,
      sukses:true
    })
    setIsSubmit(false)
  }if(error){
    console.log(error);
    setMessage({
      pesan:`Something wrong ${error.message}`,
      isError:true,
      sukses:false
    })
    setIsSubmit(false)
  }
}


const openModal = (e) => {
  e.preventDefault()
  setModal(!modal)
 }

 const selectImage = (e) => {
  e.preventDefault()
  console.log(e.target.src);
  console.log( values.imagesRef.current);
     if(e.target.classList.contains('remove')){
      setValues({...values ,
        imgPreview:''
         })
         setIsSave(false)
         values.imagesRef.current.classList.add('hide')
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
  console.log(isSave);
}
const data = {
  openModal,
  selectImage,
  imgPreview:values.imgPreview,
  isSave,
  imagesRef:values.imagesRef
}

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
<div className='columns is-multiline'>
<div className='column is-9'>
{/* start table */}
<section class="section is-main-section box bg-dark">
  <form className='is-flex is-flex-column is-flex-gap-md' onSubmit={updatePost}>
<div class="field">
  <div class="control">
    <input class="input is-primary is-bold is-size-4 bg-transparent text-white holder-white" type="text" ref={titles }  placeholder="Add title" name='title' defaultValue={post.pages_title} onChange={handlerChange}/>
  </div>
</div>
  <ReactQuill ref={ref} theme="snow" value={values.quill} onChange={handlerChange} name='quill' modules={module.toolbars} formats={module.formats}  />

  <ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
  {isSubmit ? <button type='submit' className='button is-primary'>Update</button> : 
  <button className='button is-primary' disabled>Update</button> }
</form>
</section>
{/* end table */}
</div>
{/* END SIDEBAR RIGHT */}
<div className='column box bg-dark is-3'>
<EditPageSidebar data={data} post={post}/>
</div>
{/* END SIDEBAR RIGHT*/}
</div>
{/* END COLUMNS INNER */}
</div>
{/* END COLUMN RIGHT*/}
</div>
{/* end columns */}
</div>
{/* end container */}

    {/* modal */}
<div class={modal ? "modal is-active" : "modal"}>
<div class="modal-background"></div>
<UploadMedia saveImage ={saveImage }  openModal={openModal} selectImage={selectImage}/>
<button class="modal-close is-large" aria-label="close" onClick={openModal}></button>
</div>
{/* end modal */}
</div>

    )
}

export default EditPage;




