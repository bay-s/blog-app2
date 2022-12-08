import React from 'react'
import supabase from '../supabase-config'
import PushNotifications from './notification'


class LikesAction extends React.Component{
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
  const { data, error } = await supabase.from('likes')
  .select()
  .eq('post_id',this.props.post.id)
  if(error){
    console.log(`${error} No data`);
  }
  if(data){
    console.log(data);
    data.map(likes => {
      this.setState({likes_id:likes.id})
      console.log(likes.id);
        if (likes.likes_id === id) {
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
    const id = this.props.post.id
    const author_id = this.props.post.author_id
    const lid = parseInt(e.target.dataset.likes) 
    let total_likes = parseInt(e.target.parentElement.firstChild.nextElementSibling.textContent)
    this.setState({likesToggle:!this.state.likesToggle})
    if(parseFloat(e.target.dataset.id) === id){
      if(e.target.classList.contains('likes')){
        console.log("ada like");
        this.setState({isLikes:false})
        e.target.classList.remove('likes')
        this.RemoveLikes(id,lid,total_likes)
        this.setState({isLikes:false})
        }else{
         console.log("tidakada like");
         e.target.classList.add('likes')
         this.UpdateLikes(id,total_likes)
         this.setState({isLikes:true})
         PushNotifications('likes post',author_id,id,this.props.user.uid)
        }
      }
      console.log(total_likes);
}

UpdateLikes = async (id, total_likes) => {
  // increment total_likes
  const { err ,datas}= await supabase.from('posts')
  .update({ total_likes:total_likes + 1})
  .eq('id',id)
if(err) console.log(err);
else console.log(datas);

// add likes id
const { data, error } = await supabase
  .from('likes')
  .insert([
    { 
        likes_id: this.props.user.uid,
        post_id:id
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
const { err ,datas}= await supabase.from('posts')
.update({ total_likes: total_likes - 1})
.eq('id',id)
if(err) console.log(err);
else console.log(datas);

// remove likes id
const { data, error } = await supabase
.from('likes')
.delete()
.eq('id',lid)

if(data){
    alert("Remove likes sukes")
    console.log(data);
  }if(error){
    console.log(error);
  }
}
render(){

    const is_likes = this.state.isLikes ? <i className="fa fa-heart is-size-5 is-clickable likes"  data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.props.isLogin ? this.addLikes : this.allertMessage}></i> 
    :   <i className="fa fa-heart-o  is-size-5 is-clickable" data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.props.isLogin ? this.addLikes : this.allertMessage}></i>
    return(
        is_likes
    )
}

}

export default LikesAction;