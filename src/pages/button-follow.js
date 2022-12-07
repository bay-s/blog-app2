import React from 'react'
import { Link } from "react-router-dom";
import supabase from '../supabase-config';



class ButtonFollow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        isFollow:false,
        follower_id:[],
        following_id:[]
        }
    }

    componentDidMount(){
        this.getIdFollower()
        this.getIdFollowing()
        }
        componentDidUpdate(){
          this.getIdFollower()
          this.getIdFollowing()
          }  
        getIdFollower = async () => {
          const id = this.props.current_user.uid
          console.log(id);
          const { data, error } = await supabase
          .from('follower')
          .select()
          .eq('user_id',this.props.data.uid)
          if(error){
            console.log(`${error} No data`);
          }
          if(data){
            console.log("Test");
            data.map(follow => {
              this.setState({follower_id:follow.id})
              console.log(follow.follower_id);
              console.log(id);
                if (follow.follower_id === id) {
                    console.log("sama");
                      this.setState({
                        isFollow:true
                      })
                  } else {
                      console.log("salah");
                  }
            })
          }
        }
        
getIdFollowing = async () => {
          const id = this.props.current_user.uid
          const { data, error } = await supabase
          .from('following')
          .select()
          .eq('user_id',id)
          if(error){
            console.log(`${error} No data`);
          }
          if(data){
            console.log(data);
            data.map(follow => {
              this.setState({following_id:follow.id})
            })
          }
        }
        

 AddFollow = async (e) => {
    const id = this.props.data.uid;
    const is_follows = e.target.dataset.follow;
    const fid = parseInt(e.target.dataset.id)
    const f_id = parseInt(e.target.dataset.following)

    if (is_follows === id) {
      console.log(';test');
      if (e.target.classList.contains("following")) {
        this.setState({isFollow:false})
        console.log("ada FOLLOW");
        e.target.classList.remove('following')
        this.removeFollower(id,fid)
        this.removeFollowing(f_id)
      } else {
        console.log("KOSONG");
        this.setState({isFollow:true})
        e.target.classList.add('following')
        this.updateFollower()
        this.updateUserFollowing()
      }
    }
  };
  

  updateFollower = async () => {
    const id = this.props.current_user.id
    const { err ,datas}= await supabase.from('users')
    .update({total_follower : this.props.data.total_follower + 1})
    .eq('uid',this.props.data.uid)
     if(err) console.log(err);
     else console.log(datas);
  
    const { data, error } = await supabase
      .from('follower')
      .insert([
        { 
            follower_id:this.props.current_user.uid,
            user_id:this.props.data.uid,
            detail:`${this.props.current_user.username} Has Follow ${this.props.data.username}`
        }
      ])
      if(data){
        alert("Add follow sukes")
        console.log(data);
        this.updateUserFollowing()
      }if(error){
        console.log(error);
      }
    }
        
    removeFollower = async (id,fid) => {
      const { err ,datas}= await supabase.from('users')
      .update({total_follower : this.props.data.total_follower - 1})
      .eq('uid',this.props.data.uid)
       if(err) console.log(err);
       else console.log(datas);

    const { data, error } = await supabase
    .from('follower')
    .delete()
    .eq('id',fid)
    
    if(data){
        alert("Remove follow sukes")
        console.log(data);
      }if(error){
        console.log(error);
      }
    }

    updateUserFollowing = async () => {
      const id = this.props.current_user.id
      const { err ,datas}= await supabase.from('users')
      .update({ total_following: this.props.current_user.total_following + 1})
      .eq('id',id)
       if(err) console.log(err);
       else console.log(datas);
    
        
          const { data, error } = await supabase
          .from('following')
          .insert([
            { 
                following_id:this.props.data.uid,
                user_id:this.props.current_user.uid,
                detail:`${this.props.current_user.username} Has Followwing ${this.props.data.username}`
            }
          ])
          if(data){
            alert("Add follow sukes")
            console.log(data);
          }if(error){
            alert(error)
            console.log(error);
          }
        }
    
        removeFollowing = async (f_id) => {
            const id = this.props.current_user.id
            const { err ,datas}= await supabase.from('users')
            .update({ total_following: this.props.current_user.total_following - 1})
            .eq('id',id)
             if(err) console.log(err);
             else console.log(datas);
          
            
              const { data, error } = await supabase
              .from('following')
              .delete()
              .eq('id',f_id)
              
              if(data){
                  alert("Remove follow sukes")
                  console.log(data);
                }if(error){
                  console.log(error);
                }
            }
        
    render(){
console.log( this.state.isFollow);
      const buttonFollow =
      this.state.isFollow ? 
      <button class="button is-info is-primary is-rounded is-title is-size-7 is-small following" data-id={this.state.follower_id} data-following={this.state.following_id} data-follow={this.props.data.uid}
      onClick={this.AddFollow}>Following</button>   
      :       <button class="button is-primary is-rounded is-title is-size-7 is-small" data-following={this.state.following_id}  data-id={this.state.follower_id} data-follow={this.props.data.uid}
      onClick={this.AddFollow}>Follow</button>
  
        return(
           buttonFollow
        )
    }
}

export default ButtonFollow;