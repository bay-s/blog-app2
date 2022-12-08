import React from 'react'
import supabase from '../supabase-config'
import PushNotifications from './notification'


class LikesComment extends React.Component{
constructor(props){
super(props)
this.state = {
    likes_id:[],
    isLikes:false,
    likesToggle:false
}
}

componentDidMount(){
this.getIdLikes()
}

  
getIdLikes = async () => {
  const id = this.props.user.uid
  const { data, error } = await supabase.from('comment_likes')
  .select()
  .eq('user_id',id)
  if(error){
    console.log(`${error} No data`);
  }
  if(data){
    console.log(data);
    data.map(likes => {
      this.setState({likes_id:likes.id})
        if (likes.comment_id === this.props.id) {
            console.log("sama");
              this.setState({
                  isLikes:true
              })
          } else {
              console.log("salah");         
          }
    })
  }
}

addLikes = async (e) => {
    e.preventDefault()
    const id = this.props.id
    const lid = parseInt(e.target.dataset.likes) 
    const author_id = this.props.author_id
    let total_likes = parseInt(e.target.parentElement.firstChild.nextElementSibling.textContent)
    if(parseFloat(e.target.dataset.id) === id){
      if(e.target.classList.contains('likes')){
        console.log("ada like");
        this.setState({isLikes:false})
        e.target.classList.remove('likes')
        this.RemoveLikes(id,lid,total_likes)
        this.decrementReplyLikes(id,total_likes);
        PushNotifications('likes comment',author_id,id,this.props.user.uid)
        }else{
         console.log("tidakada like");
         this.setState({isLikes:true})
         e.target.classList.add('likes')
         this.UpdateLikes(id,total_likes)
         this.incrementReplyLikes(id,total_likes);
         PushNotifications('likes',author_id,lid)
        }
      }

}

UpdateLikes = async (id,total_likes) => {
  // increment total_likes
const { err ,datas}= await supabase.from('comment')
.update({ total_likes:total_likes + 1})
.eq('id',id)
if(err) console.log(err);
else console.log(datas);

// add likes id
const { data, error } = await supabase
  .from('comment_likes')
  .insert([
    { 
        user_id: this.props.user.uid,
        comment_id:id,
        post_id:this.props.post_id
    }
  ])
  if(data){
    alert("Add likes sukes")
    console.log(data);
  }if(error){
    alert(error)
    console.log(error);
  }
}

RemoveLikes = async (id,lid,total_likes) => {
  // decrement total_likes
const { err ,datas}= await supabase.from('comment')
.update({ total_likes: total_likes - 1})
.eq('id',id)
if(err) console.log(err);
else console.log(datas);

// remove likes id
const { data, error } = await supabase
.from('comment_likes')
.delete()
.eq('id',lid)

if(data){
    alert("Remove likes sukes")
    console.log(data);
  }if(error){
    console.log(error);
  }
}

incrementReplyLikes = async (id,total_likes) => {
  const { err ,datas}= await supabase.from('comment_reply')
  .update({ total_likes: total_likes + 1})
  .eq('id',id)
  if(err) console.log(err);
  else console.log(datas);
}

decrementReplyLikes = async (id,total_likes) => {
  const { err ,datas}= await supabase.from('comment_reply')
  .update({ total_likes: total_likes - 1})
  .eq('id',id)
  if(err) console.log(err);
  else console.log(datas);
}

allertMessage = (e) => {
  e.preventDefault()
  console.log("Test");
  alert('You need login first')
}
render(){

    const is_likes = this.state.isLikes ? <i className="fa fa-heart is-size-5 is-clickable likes"  data-likes={this.state.likes_id} data-id={this.props.id} onClick={this.addLikes}></i> 
    :   <i className="fa fa-heart-o  is-size-5 is-clickable " data-likes={this.state.likes_id} data-id={this.props.id} onClick={this.addLikes}></i>
    return(
        is_likes
    )
}

}

export default LikesComment;