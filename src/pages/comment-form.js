import React, { useContext, useRef, useState } from 'react'
import module from '../dashboard/quill-modules';
import ReactQuill from 'react-quill';
import ErrorMessage from '../dashboard/error-message';
import supabase from '../supabase-config';
import ReplyForm from './reply-form';


const CommentForm = (props) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState({
      pesan: "",
      isError: false,
      sukses: false,
    });
    const [values, setValue] = useState({
      name: "",
      email:'',
      quill: "",
      ref:useRef(null),
      names:useRef(null),
      emails:useRef(null)
    });

      const handlerChange = (e) => {
        const strlen = values.ref.current.getEditor()
        .getText().length
        setValue({
        ...values,
        name:values.names.current?.value,
        email:values.emails.current?.value,
        quill:values.ref.current?.value
        });

         if (strlen > 1) {
           setIsSubmit(true);
         } else {
           setIsSubmit(false);
         }
      };

     const postComment = async (e) => {
      e.preventDefault()
      setIsSubmit(false)
      if(!values.email || !values.name){
        setMessage({
          pesan:`Name and email required`,
          isError: true,
          sukses: false,
        });
        return
      }
      const { error } = await supabase.from('comment')
      .insert({ 
        comment_content:values.quill,
        author_name:values.name,
        author_email:values.email,
        post_id:props.id
      })
      if(error){
        setMessage({
          pesan:`Something went wrong ${error.message}`,
          isError: true,
          sukses: false,
        });
      }else{
        setMessage({
          pesan:`Comment posted`,
          isError: false,
          sukses:true,
        });
        setValue({
          ...values,
          name:'',
          email:'',
          quill:''
          });
      }
     } 
    return(
<section className="section is-main-section p-1">
<form className='is-flex is-flex-column is-flex-gap-md box bg-dark' onSubmit={postComment}>
<h3 className='text-title is-title  mb-3'>
Leave a Comment
</h3>
<ReactQuill ref={values.ref} theme="snow" value={values.quill} name='quill'  modules={module.toolbars} formats={module.formats} onChange={handlerChange}/>
{isSubmit ? <button type='submit' className='button is-primary navbar-end'>Submit</button> :
<button className='button is-primary navbar-end' disabled>Submit</button>}
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
</form>

</section>
    )
}

export default CommentForm;