import React, { useContext, useEffect, useRef, useState }  from "react";
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import supabase from '../supabase-config';
import ErrorMessage from './error-message';
import { AppContext } from '../App';
import module from './quill-modules';
import PagesSidebar from "./create-pages-sidebar";

const PagesEditor = (props) => {
    const {value} = useContext(AppContext)
    const [message,setMessage] = useState({
      pesan:'',
      error:'',
      sukses:''
    })
    const [content,setContent] = useState({
      title:'',
      quill:''
    })
    const [isSubmit,setIsSubmit] = useState(false)
    const ref = useRef(null);
    const titles = useRef(null)

    const handlerChange = (e) => {
      setContent({...content,
        title:titles.current?.value,
        quill:ref.current?.value,   
         })
         console.log(content.title);
    if(content.quill.length > 0){
        setIsSubmit(true)
    }else{
        setIsSubmit(false)
    }
    }

  const createPages = async (e) => {
      e.preventDefault()
      setIsSubmit(true)
      e.preventDefault()
      console.log("Test");
      if(!content.title || !content.quill){
        setMessage({
          pesan:`Input Value Required`,
          error:true,
          sukses:false
        })
        return
      }
    
      const { data, error } = await supabase
      .from('pages')
      .insert({
        pages_title:content.title,
        pages_content:content.quill,
        author_id:value.data.uid ,
        pages_thumbnail:props.data.imgPreview,
      })
      .select()
      if(data){
        console.log(data);
        incrementPages()
        setMessage({
          pesan:`Create Post Success`,
          error:false,
          sukses:true
        })
        setIsSubmit(false)
      }if(error){
        console.log(error);
        setMessage({
          pesan:`Something wrong ${error.message}`,
          error:true,
          sukses:false
        })
        setIsSubmit(false)
      }
    }

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

   const incrementPages = async () => {
    const { data, error } = await supabase
    .rpc('incrementpages', { x: 1, row_id:value.data.id })
    if(error) console.log(error.message);
    else console.log(data);
   }
    return(
        <div className='columns is-multiline'>
<div className='column is-9  '>
{/* START EDITOR*/}
<section class="section is-main-section box bg-dark">
  <form className='is-flex is-flex-column is-flex-gap-md' onSubmit={createPages}>
<div class="field">
  <div class="control">
    <input class="input is-primary is-bold is-size-4 bg-transparent text-white holder-white" type="text" ref={titles }  placeholder="Pages title" name='title' onChange={handlerChange}/>
  </div>
</div>
<ReactQuill ref={ref} theme="snow" value={content.quill} onChange={handlerChange} name='quill'  modules={module.toolbars} formats={module.formats} />
<ErrorMessage pesan={message.pesan} isError={message.error} sukses={message.sukses}/>
  {button()}
</form>
</section>
{/* END EDITOR */}
</div>
{/* END SIDEBAR RIGHT */}
<div className='column box bg-dark is-3'>
<PagesSidebar  data={props.data}  />
</div>
{/* END SIDEBAR RIGHT*/}
</div>
/* END COLUMNS INNER */
    )
}

export default PagesEditor;