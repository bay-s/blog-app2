import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import supabase from '../supabase-config'

const MenusLeft = (props) => {
  const {value } = useContext(AppContext)
  const [menus,setMenus] = useState([])

  useEffect(() => {
   fetchPost()
  },[])
 
  const fetchPost = async () => {
   const { data, error } = await supabase
   .from('pages')
   .select()
   if(data){
     console.log(data);
    setMenus(data)
   }if(error) console.log(error.message);
  }
 

    return(

<div className='box bg-dark column is-3'>
<h3 className='is-bold is-title p-2 text-title'>Add menu items</h3>
<section class="accordions">
<article class="accordion is-active">
<div class="accordion-header has-background-white shadow p-4">
  <p className='text-dark is-title'>Pages</p>
  <button class="toggle has-background-dark" aria-label="toggle" onClick={props.openCollapse}></button>
</div>
<div class="accordion-body">
  <form class="accordion-content border shadow p-2" >
  {/* SELECT PAGE */}
 <ul className='is-flex is-flex-column'>
{menus.length < 1 ? "" : menus.map(menu => {
return <li key={menu.id}>
  <label class="b-checkbox checkbox">
  <input type="checkbox"  value={menu.pages_title} data-id={menu.id} onChange={props.data.handlerChange} ref={props.data.checkContainer}/>
  <span class="check is-size-6"></span>
   <span className='px-2 is-size-6'>{menu.pages_title}</span>
  </label>
  </li>
})
}
</ul>
{/* END SELECT PAGE */}
<hr className='navbar-divider' />
  <button className='button is-small is-outlined is-info navbar-end' onClick={props.data.addMenu}>Add to menu</button>
</form>
  {/* END ACCORDION CONTENT */}
  </div>
{/* END ACCORDION BODY */}
</article>
<article class="accordion">
<div class="accordion-header has-background-white shadow p-4">
<p className='text-dark is-title'>Posts</p>
  <button class="toggle has-background-dark" aria-label="toggle" onClick={props.openCollapse}></button>
</div>
{/* END ACCORDION HJEADER */}
<div class="accordion-body">
  <div class="accordion-content">
  <ul className='is-flex is-flex-column'>
  <li>
  <label class="b-checkbox checkbox">
  <input type="checkbox" value="false" />
  <span class="check is-size-7"></span>
   <span className='px-2 is-size-7'>Music</span>
  </label>
  </li>
  <li>
  <label class="b-checkbox checkbox">
  <input type="checkbox" value="false" />
  <span class="check is-size-7"></span>
   <span className='px-2 is-size-7'>About</span>
  </label>
  </li>
</ul>
  </div>
  {/* END ACCORDION CONTENT */}
</div>
{/* END ACCORDION BODY */}
</article>
<article class="accordion">
<div class="accordion-header has-background-white shadow p-4">
<p className='is-title text-dark'>Category</p>
  <button class="toggle has-background-dark" aria-label="toggle" onClick={props.openCollapse}></button>
</div>
{/* END BODY */}
<div class="accordion-body">
  <div class="accordion-content">
  <ul className='is-flex is-flex-column'>
  <li>
  <label class="b-checkbox checkbox">
  <input type="checkbox" value="false" />
  <span class="check is-size-7"></span>
   <span className='px-2 is-size-7'>Music</span>
  </label>
  </li>
  <li>
  <label class="b-checkbox checkbox">
  <input type="checkbox" value="false" />
  <span class="check is-size-7"></span>
   <span className='px-2 is-size-7'>About</span>
  </label>
  </li>
</ul>
  </div>
  {/* END ACCORDION CONTENT */}
  </div>
{/* END ACCORDION BODY */}
</article>
</section>

</div>
    )
}

export default MenusLeft;