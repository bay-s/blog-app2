import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../pages/header';
import supabase from '../supabase-config';
import PostList from './post-list';
import Sidebar from './sidebar';

const GetPost = (props) => {
const {id} = useParams()
const [post,setPost] = useState([])
useEffect(() => {
const getPost = async () => {
   const { data, error } = await supabase
  .from('posts')
  .select()
  .contains('post_cat', [`${id}`])
  if(data) {
    setPost(data)
    console.log(data);
  }
  if(error) console.log(error);
}
getPost()
},[])

return(
<div id="app">
<Header />
<div class="container is-fluid my-5 pt-3">
<div className='columns is-multiline'>
{/* START SIDEBAR */}
<div className='column is-2 bg-dark'>
<Sidebar />
</div>
{/* END SIDEBAR */}
<div className='column '>
<div className='box shadow is-flex align-center is-flex-gap-md bg-dark'>
<h3 className='is-bold is-title is-size-4 text-white'>Post by category :</h3>
<h3 className='is-bold is-title is-size-5 text-white capital'>{id}</h3>
</div>

{/* start table */}
<section class="section is-main-section ">
<div class="card has-table ">
      <header class="card-header ">
        <p class="card-header-title">
          <span class="icon"><i class="mdi mdi-account-multiple"></i></span>
          Clients
        </p>
        <a href="#" class="card-header-icon">
          <span class="icon"><i class="mdi mdi-reload"></i></span>
        </a>
      </header>
      <div class="card-content ">
        <div class="b-table has-pagination">
          <div class="table-wrapper has-mobile-cards">
            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <thead>
              <tr>
                <th class="is-checkbox-cell">
                  <label class="b-checkbox checkbox">
                    <input type="checkbox" value="false" />
                    <span class="check"></span>
                  </label>
                </th>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Created</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
{/* POST LIST */}
<PostList post={post} key={post}/>
{/* END POST LIST */}
              </tbody>
            </table>
          </div>
          <div class="notification">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <div class="buttons has-addons">
                    <button type="button" class="button is-active">1</button>
                    <button type="button" class="button">2</button>
                    <button type="button" class="button">3</button>
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <small>Page 1 of 3</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
{/* end table */}
</div>
{/* END COLUMN RIGHT*/}
</div>
{/* end columns */}
</div>
{/* end container */}
</div>

)
}

export default GetPost;