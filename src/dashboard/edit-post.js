import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../pages/header';
import Sidebar from './sidebar';
import ReactQuill from 'react-quill';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import UploadMedia from './upload-media';
import EditPostSidebar from './edit-post-sidebar';
import module from './quill-modules';


const EditPost = (props) => {
  const {value} = useContext(AppContext)
  const {id} = useParams()
  const [post,setPost] = useState([])
  const [modal,setModal] = useState(false)
  const [isSave,setIsSave] = useState(false)
  const [values, setValues] = useState({
      title:'',
      quill:'',
      excerpt:'',
      imgPreview:'',
      imagesRef:useRef(null)
    });

   const [message,setMessage] = useState({
    pesan:'',
    isError:false,
    sukses:false
   })

   const [text,setText] = useState({
    category:'',
    tags:''
   })
   const [arrValue,setArrValue] = useState({
    catArr:[],
    tagArr:[],
    checkArr:[]
   })

    const [isSubmit,setIsSubmit] = useState(false)
    const ref = useRef(null);
    const titles = useRef(null)

useEffect(() => {
        fetchPost()
  },[])
  const fetchPost = async () => {
    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('id',id)
    if(data){
      setPost(data[0])
      setArrValue({...arrValue,
          tagArr:[...arrValue.tagArr,...data[0].post_tag],
          checkArr:[...arrValue.checkArr,...data[0].post_tag],
          })
     setValues({...values ,
            quill:data[0].post_content,
       })
    }if(error) console.log(error);
}

const handlerChange = (e) => {
if(ref.current !== null) {
  const texts = ref.current.getEditor().getText().match(/.{1,250}/g)
  setValues({...values ,
    title:titles.current?.value,
    quill:ref.current?.value,
    excerpt:texts[0]
     })
console.log(values.imgPreview);
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
  .from('posts')
  .update({
    post_title:values.title,
    post_content:values.quill,
    post_cat:arrValue.checkArr,
    post_tag:arrValue.tagArr,
    the_excerpt:values.excerpt,
    post_thumbnail:values.imgPreview,
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


const handlerChanges = (e) => {
  const {name,value} = e.target
  let isChecked = e.target.checked;
  setText({[name]:value})
if(isChecked){
  setArrValue({...arrValue,
    checkArr:[...arrValue.checkArr,e.target.value]
    })
}else{
const copyArr = [...arrValue.checkArr]; // make a separate copy of the array
const index = copyArr.indexOf(e.target.value)
if (index !== -1) { // only splice array when item is found
copyArr.splice(index, 1);
 setArrValue({...arrValue,
  checkArr:copyArr 
   })
}
}
}
const addCategory = async (e) => {
 e.preventDefault()
setArrValue({...arrValue,
  catArr:[...arrValue.catArr, text.category]
   })
 if(!text.category){
   alert("Input cant be empty")
   return
 }
 const {data,err} = await supabase.from('category')
 .insert([{category:text.category}])
 .select()
 if(err) console.log(err);
 if(data) console.log(data);
}

const addTags = (e) => {
 e.preventDefault()
 setArrValue({...arrValue,
  tagArr:[...arrValue.tagArr, text.tags]
   })
   console.log(arrValue.tagArr);
}


const removeTagArr = e => {
 e.preventDefault()
 const copyArr = [...arrValue.tagArr]; // make a separate copy of the array
 const index = copyArr.indexOf(e.target.parentElement.textContent)
 if (index !== -1) {
   copyArr.splice(index, 1);
   setArrValue({...arrValue,
    tagArr:copyArr 
     })
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
  removeTagArr,
  addTags,
  addCategory,
  handlerChanges,
  tagArr:arrValue.tagArr,
  catArr:arrValue.catArr,
  text,
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
<div className='column is-9  '>
{/* start table */}
<section class="section is-main-section box bg-dark">
  <form className='is-flex is-flex-column is-flex-gap-md' onSubmit={updatePost}>
<div class="field">
  <div class="control">
    <input class="input is-primary is-bold is-size-4 bg-transparent text-white holder-white" type="text" ref={titles }  placeholder="Post title" name='title' defaultValue={post.post_title} onChange={handlerChange}/>
  </div>
</div>
  <ReactQuill ref={ref} theme="snow" value={values.quill} onChange={handlerChange} name='quill' modules={module.toolbars} formats={module.formats}  />

  <ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
  {isSubmit ? <button type='submit' className='button is-primary'>Publish</button> : 
  <button className='button is-primary' disabled>Publish</button> }
</form>
</section>
{/* end table */}
</div>
{/* END SIDEBAR RIGHT */}
<div className='column box bg-dark is-3'>
<EditPostSidebar data={data} post={post}/>
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

export default EditPost;




