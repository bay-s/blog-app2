import React, { useContext, useEffect, useRef, useState }  from "react";
import ReactQuill from 'react-quill';
import PostSidebar from './create-post-sidebar';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import module from './quill-modules';

const PostEditor = (props) => {
    const { value } = useContext(AppContext);

    const [message, setMessage] = useState({
      pesan: "",
      isError: false,
      sukses: false,
      isUpload: false,
    });

    const [values, setValues] = useState({
      title: "",
      quill: "",
      imgUrl:""
    });
    const [text, setText] = useState({
      category: "",
      tags: "",
    });
    const [arrValue, setArrValue] = useState({
      catArr: [],
      tagArr: [],
      checkArr: [],
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const ref = useRef(null);
    const titles = useRef(null);

    // GET QUILL EDITOR TEXT
const handlerChange = (e) => {

      const texts = ref.current
        .getEditor()
        .getText()
        .match(/.{1,250}/g);
      setValues({
        ...values,
        title: titles.current?.value,
        quill: ref.current?.value,
        excerpt: texts[0],
      });
      if (ref.current.getEditor().getText().length <= 2) {
        setIsSubmit(false);
      } else {
        setIsSubmit(true);
      }
    };

const createPost = async (e) => {
      setIsSubmit(true);
      setMessage({ ...message, isUpload: true });
      e.preventDefault();

      if (!values.title || !values.quill) {
        setMessage({
          pesan: `Input Value Required`,
          isError: true,
          sukses: false,
        });
        setIsSubmit(false);
        setMessage({ ...message, isUpload: false });
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          post_title: values.title,
          post_content: values.quill,
          post_cat: arrValue.checkArr,
          post_tag: arrValue.tagArr,
          the_excerpt: values.excerpt,
          post_thumbnail:values.imgUrl,
          author_id: value.data.uid,
        })
        .select();
      if (data) {
        console.log(data);
        incrementPosts()
        setIsSubmit(false);
        setMessage({
          pesan: `Create Post Success`,
          isError: false,
          sukses: true,
          isUpload: false,
        });
        setValues({})
        titles.current.value = ''
      }
      if (error) {
        console.log(error);
        setMessage({
          pesan: `Something wrong ${error.message}`,
          isError: true,
          sukses: false,
          isUpload: false,
        });
        setIsSubmit(false);
      }
    };

    const handlerChanges = (e) => {
      const { name, value } = e.target;
      let isChecked = e.target.checked;
      setText({ [name]: value });
      console.log(e.target.value.toLowerCase());
      if (isChecked) {
        setArrValue({
          ...arrValue,
          checkArr: [...arrValue.checkArr, e.target.value.toLowerCase()],
        });
      } else {
        const copyArr = [...arrValue.checkArr]; // make a separate copy of the array
        const index = copyArr.indexOf(e.target.value.toLowerCase());
        if (index !== -1) {
          // only splice array when item is found
          copyArr.splice(index, 1);
          setArrValue({ ...arrValue, checkArr: copyArr });
        }
      }
    };
    const addCategory = async (e) => {
      e.preventDefault();
      //  setCatArr(catArr => [...catArr, text.category]);
      if (!text.category) {
        alert("Input cant be empty");
        return;
      }
     setArrValue({ ...arrValue, catArr: [...arrValue.catArr, text.category] });
      const { data, err } = await supabase
        .from("category")
        .insert([{ category: text.category }])
        .select();
      if (err) console.log(err);
      if (data) console.log(data);
    };

    const addTags = (e) => {
      e.preventDefault();
      //  setTagArr(tagArr => [...tagArr, text.tags]);
      setArrValue({ ...arrValue, tagArr: [...arrValue.tagArr, text.tags] });
      console.log(arrValue.tagArr);
    };

    const removeTagArr = (e) => {
      e.preventDefault();
      const copyArr = [...arrValue.tagArr]; // make a separate copy of the array
      const index = copyArr.indexOf(e.target.parentElement.textContent);
      if (index !== -1) {
        copyArr.splice(index, 1);
        setArrValue({ ...arrValue, tagArr: copyArr });
      }
    };

    const button = () => {
      if (isSubmit) {
        return (
          <button type="submit" className="button is-primary">
            Publish
          </button>
        );
      } else if (!isSubmit) {
        return (
          <button className="button is-primary" disabled>
            Publish
          </button>
        );
      } else {
        return (
          <button className="button is-primary is-loading" disabled>
            Publish
          </button>
        );
      }
    };

    // increment total post
const incrementPosts = async () => {
const { err ,datas}= await supabase.from('users')
.update({total_post:value.data.total_post + 1})
.eq('uid',value.data.uid)
if(err) console.log(err);
else console.log(datas);

}


// FUNCTION UPLOAD IMAGE

const [images,setImages] = useState({
  imgName:'',
  url:'',
  imgUpload:'',
  isUpload:false,
  hide:false,
  media:[],
  media_url:[]
})

const  ImageChange = event => {
  console.log(event.target.files);
  if (event.target.files && event.target.files[0]) {
    let img = event.target.files[0];
    const randName =  (Math.random() + 1).toString(36).substring(3);
    const imgStr = img.name.split(".")
    const names = `${randName}.${imgStr[1]}`
    uploadImage(img,names)
    setImages({...images ,
      imgUpload: URL.createObjectURL(img),
      url:img,
      hide:true,
      isUpload:true,
      imgName:`${randName}.${imgStr[1]}`
       })

       
    }
};

const uploadImage = async (images,names) => {
  // e.preventDefault()
  setImages({...images ,
      isUpload:false
       })
  const { data, error} = await supabase.storage
  .from('images')
  .upload(`public/${names}`, images,{
    cacheControl: '604800',
    upsert: false
  })
  if(error){
console.log(error);
  }
  if(data){
   console.log(data);
   getPublicUrls(data.path)
  }
}

const getPublicUrls = (url) => {
  const { data } = supabase
  .storage.from('images')
  .getPublicUrl(url)
  if(data){
    const imgUrl= data.publicUrl;
    console.log(imgUrl);
    setValues({
      ...values,
      imgUrl:imgUrl
    });
  }

 }

 const removeImage = async (e) => {
  e.preventDefault()
  setImages({...images ,
    imgUpload:'',
    hide:false,
     })

const { data, error } = await supabase.storage.from('images')
  .remove([`public/${images.imgName}`])
  if(error) alert(error)
  else console.log(data);
 }

 const methods = {
  removeTagArr,
  addTags,
  addCategory,
  handlerChanges,
  tagArr:arrValue.tagArr,
  catArr:arrValue.catArr,
}  

    return(
      
<div className='columns is-variable bd-klmn-columns is-2'>
<div className='column is-9 py-0 px-5'>
{/* START EDITOR*/}
<section class="section is-main-section box bg-dark ">
<form className='is-flex is-flex-column is-flex-gap-md' onSubmit={createPost}>

<div className="is-flex align-center is-flex-gap-xl">

<div class="file is-info has-name mb-2">
  <label class="file-label">
    <input class="file-input" type="file" name="resume" onChange={ImageChange}/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Add thumbnail
      </span>
    </span>
  </label>
</div>

<div className={images.hide ? '' : 'hide'} >
<figure class="image is-96x96">
<img src={images.imgUpload} />
</figure>
</div>

<button className={images.hide ? "button is-outlined is-danger is-small" : 'hide'} onClick={removeImage}>Remove</button>
</div>

<div class="field">
  <div class="control">
    <input class="input is-primary is-bold is-size-4 bg-transparent text-white holder-white" type="text" ref={titles }  placeholder="Post title" name='title' onChange={handlerChange}/>
  </div>
</div>
<ReactQuill ref={ref} theme="snow" value={values.quill} onChange={handlerChange} name='quill'  modules={module.toolbars} formats={module.formats} />
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
  {button()}
</form>
</section>
{/* END EDITOR */}
</div>
{/* END SIDEBAR RIGHT */}
<div className='column box bg-dark is-3'>
<PostSidebar data={props.data} methods={methods} />
</div>
{/* END SIDEBAR RIGHT*/}
</div>
/* END COLUMNS INNER */
    )
}

export default PostEditor;