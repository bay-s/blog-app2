import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';


const Sidebar = () => {
const {value} = useContext(AppContext);
const [totalPost,setTotalPost] = useState([])
const [totalFollowing,setTotalFollowing] = useState([])
const [totalFollower,setTotalFollower] = useState([])
const [totalComment,setTotalComment] = useState([])

useEffect(() => {
  fetchPost()
  getFollower()
  getFollowing()
  fetchComment()
},[])

const fetchPost = async () => {
  const { data, error ,count} = await supabase
  .from('posts')
  .select()
  .eq('author_id',value.data.uid)
  if(data){
    setTotalPost(data)
  }if(error) console.log(error.message);
 }

 const getFollowing = async () => {
  const { data, error } = await supabase.from('following')
  .select()
  .eq('user_id',value.data.uid)
  if(error) console.log(error);
  else{
      setTotalFollowing(data)
  }
}

const  getFollower = async () => {
  const { data, error } = await supabase
  .from('follower')
  .select()
  .eq('user_id',value.data.uid)
  if(error) console.log(error);
  else{
      setTotalFollower(data)
  }
}

const fetchComment = async () => {
  const { data, error ,count} = await supabase
  .from('comment')
  .eq('receive_id',value.data.uid)
  if(data){
    setTotalComment(data)
  }if(error) console.log(error.message);
 }
    return(
        <aside className="home-sidebar dashboard-sidebar">
        <div className="menu is-menu-main">
          <ul className="menu-list">
            <li>
            <Link to='/dashboard/index' className="is-active router-link-active has-icon">
                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                <span className="menu-item-label">Dashboard</span>
                </Link>
            </li>
          </ul>
          <ul className="menu-list py-2">
            <li>
              <Link to='/dashboard/posts' clasName="has-icon">
                <span className="icon has-update-mark"><i clasName="mdi mdi-table"></i></span>
                <span className="menu-item-label">Posts</span>
                {
                  totalPost.length < 1 || undefined ? ''
                  :
                  <span className="tag is-info is-title is-bold mx-3">{ totalPost.length}</span>
                }
              </Link>
            </li>
            <li>
            <Link to='/dashboard/comment/' className="has-icon">
                <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                <span className="menu-item-label">Comment</span>
                {
                  totalComment.length < 1 || undefined ? ''
                  :
                  <span className="tag is-info is-title is-bold mx-3">{totalComment.length}</span>
                }
            </Link>
            </li>
            <li>
            <Link to='/dashboard/follower/' className="has-icon">
                <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                <span className="menu-item-label">Follower</span>
                {
                  totalFollower.length < 1 || undefined ? ''
                  :
                  <span className="tag is-info is-title is-bold mx-3">{totalFollower.length}</span>
                }
            </Link>
            </li>
            <li>
            <li>
            <Link to='/dashboard/following/' className="has-icon">
                <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                <span className="menu-item-label">Following</span>
                {
                  totalFollowing.length < 1 || undefined ? ''
                  :
                  <span className="tag is-info is-title is-bold mx-3">{ totalFollowing.length}</span>
                }
            </Link>
            </li>
            <Link to='/dashboard/edit-profile/' className="has-icon">
                <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                <span className="menu-item-label">Setting</span>
            </Link>
            </li>
            <li>
            <Link to='/dashboard/bookmark' className="has-icon">
            <span className="icon"><i classNames="mdi mdi-account-circle"></i></span>
                <span className="menu-item-label">Bookmarked</span>
            </Link>
            </li>
          </ul>

        </div>
      </aside>
    )
}

export default Sidebar;