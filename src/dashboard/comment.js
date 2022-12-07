import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import CommentList from './comment-list';
import ReplyList from './comment-reply-list';


const Comment = (props) => {
     const {value} = useContext(AppContext)
    const [comment,setComment] = useState([])
    const [totalPost,setTotalPost] = useState(0)
    const [reply,setReply] = useState([])

    useEffect(() => {
      fetchComment()
     fetchCommentReply()
    },[])
  
    const fetchComment = async () => {
     const { data, error ,count} = await supabase
     .from('comment')
     .select('*', { count: 'exact' })
     .eq('author_id',value.data.uid)
     if(data){
       console.log(data);
       setTotalPost(count)
       setComment(data)
     }if(error) console.log(error.message);
    }
    const fetchCommentReply = async () => {
      const { data, error ,count} = await supabase
      .from('reply_comment')
      .select('*', { count: 'exact' })
      if(data){
        setReply(data)
      }if(error) console.log(error.message);
     }
    return(
<>
<div className='box shadow is-flex align-center is-flex-gap-md bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Comment</h3>
</div>

    {/* start table */}
<section class="section is-main-section p-2 ">
<div class="card has-table ">
      <div class="card-content ">
        <div class="b-table has-pagination">
          <div class="table-wrapper has-mobile-cards">
            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <thead className='border-butt'>
              <tr>
                <th>Author</th>
                <th>Comment</th>
                <th>In response to</th>
                <th>Submitted on</th>
              </tr>
              </thead>
              <tbody>
{/* POST LIST */}
<CommentList  post={comment} key={comment}/>
<ReplyList post={reply} key={reply}/>
{/* END POST LIST */}
              </tbody>
            </table>
          </div>
{/* PAGINATION */}

{/* END PAGINATION */}
        </div>
      </div>
    </div>
</section>
{/* end table */}
</>
    )
}

export default Comment;