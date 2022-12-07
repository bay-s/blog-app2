import React, { useContext, useRef, useState } from 'react'
import module from '../dashboard/quill-modules';
import ReactQuill from 'react-quill';
import ErrorMessage from '../dashboard/error-message';
import supabase from '../supabase-config';
import { AppContext } from '../App';

const ReplyForm = (props) => {
    const {value} = useContext(AppContext)
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState({
      pesan: "",
      isError: false,
      sukses: false,
    });
    const [values, setValue] = useState({
      quill: "",
      ref:useRef(null),
    });

      const handlerChange = (e) => {
        const strlen = values.ref.current.getEditor()
        .getText().length

        setValue({
        ...values,
        quill:values.ref.current?.value
        });

         if (strlen <= 2 ) {
           setIsSubmit(false);
         } else {
           setIsSubmit(true);
         }

      };

     const postComment = async (e) => {
      e.preventDefault()
      const strlen = values.ref.current.getEditor()
      .getText().length
      setIsSubmit(false)

      if(!strlen){
        setMessage({
          pesan:`Input field required`,
          isError: true,
          sukses: false,
        });
        return
      }
      const { error } = await supabase.from('comment_reply')
      .insert({ 
        reply_content:values.quill,
        author_id:value.data.uid,
        comment_id:props.comment_id,
        post_id:props.post_id,
        receive_id:props.receive_id
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
          quill:''
          });
      }
     } 

return(
<section className="section is-main-section p-0">
<form className='is-flex is-flex-column is-flex-gap-md ' onSubmit={postComment}>
<ReactQuill ref={values.ref} theme="snow" value={values.quill} name='quill'  modules={module.toolbars} formats={module.formats} onChange={handlerChange}/>
{/* START BUTTON */}
<div className='is-flex align-center navbar-start is-flex-gap-md button-quill'>
<span className='button is-clickable' onClick={props.opensReply}>Cancel</span>
{isSubmit ? <button type='submit' className='button is-primary'>Submit</button> :
<button className='button is-primary' disabled>Submit</button>}
</div>
{/* END BUTTON */}
<ErrorMessage pesan={message.pesan} isError={message.isError} sukses={message.sukses}/>
</form>
</section>
    )
}

export default ReplyForm;