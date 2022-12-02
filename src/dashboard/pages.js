import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../pages/pagination';
import supabase from '../supabase-config';
import PagesList from './pages-list';
import Sidebar from './sidebar';


const Pages = (props) => {
  const [post,setPost] = useState([])
  const [totalPost,setTotalPost] = useState(0)
  const [value,setValue] = useState({
    page:0,
    leftPage:totalPost,
    counts:4
    })
  
  useEffect(() => {
   fetchPost()
  },[value.page,value.counts])
 
  const fetchPost = async () => {
    const { data, error ,count} = await supabase
   .from('pages')
   .select('*', { count: 'exact' })
   .order("id", { ascending: true })
   .range(value.page,value.counts)
   if(data){
     console.log(data);
     setTotalPost(count)
     setPost(data)
   }if(error) console.log(error.message);
  }
 
    return(
<>
<div className='box shadow is-flex align-center is-flex-gap-md  bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Pages</h3>
<Link to='/dashboard/create-page/' className='button hvr-sweep-to-right is-outlined border-primary bg-transparent text-title is-small'>Add New</Link>
</div>

{/* start table */}
<section class="section is-main-section p-2">
<div class="card has-table">
      <div class="card-content">
        <div class="b-table has-pagination">
          <div class="table-wrapper has-mobile-cards">
            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <thead>
              <tr>
                <th class="is-checkbox-cell">
       #
                </th>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
{/* PAGES LIST */}
<PagesList  post={post} key={post}/>
{/* END PAGE LIST */}
              </tbody>
            </table>
          </div>
{/* PAGINATION */}
<Pagination setValue={setValue} totalPost={totalPost} value={value} />
{/* END PAGINATION */}
        </div>
      </div>
    </div>
</section>
{/* end table */}
</>
    )
}

export default Pages;