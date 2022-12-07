import React, { useContext, useRef, useState } from 'react'
import module from '../dashboard/quill-modules';
import ReactQuill from 'react-quill';
import ErrorMessage from '../dashboard/error-message';
import supabase from '../supabase-config';
import ReplyForm from './reply-form';
import Avatar from '../dashboard/avatar';
import { AppContext } from '../App';


const CommentForm = (props) => {
    const {value} = useContext(AppContext)
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState({
      pesan: "",
      isError: false,
      sukses: false,
    });
    const [values, setValue] = useState({
      quill: "",
      ref:useRef(null)
    });

      const handlerChange = (e) => {
        const strlen = values.ref.current.getEditor()
        .getText().length
        setValue({
        ...values,
        quill:values.ref.current?.value
        });
         if (strlen <= 2) {
          setIsSubmit(false);
         } else {
           setIsSubmit(true);
         }
      };

     const postComment = async (e) => {
      e.preventDefault()
      setIsSubmit(false)
      const { error } = await supabase.from('comment')
      .insert({ 
        comment_content:values.quill,
        author_id:value.data.uid,
        receiver_id:props.post.author_id,
        post_id:props.id,
      })
      if(error){
        setMessage({
          pesan:`Something went wrong ${error.message}`,
          isError: true,
          sukses: false,
        });
      }else{
        incrementTotalComment()
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

     const incrementTotalComment = async () => {
      const { err ,datas}= await supabase.from('posts')
      .update({ total_comment:props.post.total_comment + 1})
      .eq('id',props.id)
       if(err) console.log(err);
       else console.log(datas);   
     }
    return(
<section className="section is-main-section p-1">
<form className='is-flex is-flex-column is-flex-gap-md ' onSubmit={postComment}>
<h3 className='text-title is-title  mb-5'>
Leave a Comment
</h3>
<div className='is-flex is-flex-gap-xl'>
<figure className="image is-48x48">
  <Avatar id={value.data.uid}/>
</figure>
<div className='w-100'>
<ReactQuill  ref={values.ref} theme="snow" value={values.quill} name='quill'  modules={module.toolbars} formats={module.formats} onChange={handlerChange}/>
<div className='button-quill'>
{isSubmit ? <button type='submit' className='button is-primary '>Submit</button> :
  <button className='button is-primary mt-3' disabled>Submit</button>}
</div>
</div>
</div>

<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
</form>

</section>
    )
}

export default CommentForm;