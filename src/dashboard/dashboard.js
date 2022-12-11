import React, { useContext } from 'react'
import { useParams ,Navigate} from 'react-router-dom';
import Header from '../pages/header';
import Bookmarked from './bookmarked';
import Comment from './comment';
import EditProfile from './edit-profile';
import Main from './main';
import Posts from './posts';
import Sidebar from './sidebar';
import TotalFollower from './total-follower';
import TotalFollowing from './total-following';


const DashBoard = () => {
const {id} = useParams()
const string_id = id.toString().toLowerCase()

    return( 
<div id="app">
<Header />
<div className="container is-fluid my-5">
<div className='columns is-multiline dashboard-container'>
{/* START SIDEBAR */}
<div className='column is-3 bg-dark my-3'>
<Sidebar />
</div>
{/* END SIDEBAR */}
<div className='column is-9 '>
<div className={string_id === 'index' ? 'box bg-dark shadow' : 'hide' }>
<h3 className='is-bold is-title is-size-4 text-title capital'>{string_id === 
'index' ? "Dashboard" : string_id}</h3>
</div>
{string_id === 'index' ?  <Main />  : ""}
{string_id === 'posts' ?  <Posts />  : ""}
{string_id === 'edit-profile' ? <EditProfile /> : ""}
{string_id === 'bookmark' ? <Bookmarked /> : ""}
{string_id === 'comment' ? <Comment /> : ""}
{string_id === 'follower' ? <TotalFollower /> : ""}
{string_id === 'following' ? <TotalFollowing /> : ""}
</div>
{/* END CONTETN */}

{/* END COLUMN RIGHT */}
</div>
{/* END COLUMNS */}
</div>
{/* END CONTAINER */}
</div>

    )
}

export default DashBoard;