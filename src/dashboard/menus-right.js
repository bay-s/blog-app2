import React, { useEffect, useRef, useState } from 'react'
import supabase from '../supabase-config';
import MenusList from './menu-list';
import MenusAccordion from './menus-accordion';


const MenusRight= (props) => {
  const [menus,setMenus] = useState([])
  const [names,setNames] = useState('')
  const menuCheck = useRef(null)
  const [isSubmit,setIsSubmit] = useState(false)
  const [menusItem,setMenusItem] = useState({
    menu:[],
    saveMenu:[]
  })
  const Menu = props.data.menusItem.tempMenu.map(menus => {
    return <MenusAccordion  menus={menus}  removeMenu={props.data.removeMenu}  openCollapse={props.openCollapse} data={props.data}/>
  })
  const menuList = menus.map(menus => {
     return menus.menu_item.map(menu => {
      return <MenusList  menus={menus} menu={menu} removeMenu={props.data.removeMenu} openCollapse={props.openCollapse} />
     })
  })

  useEffect(() => {
   const fetchMenu = async () => {
  const { data, error } = await supabase
  .from('menu')
  .select()
  if(data){
    console.log(data);
    setMenus(data)
  }if(error) console.log(error);
   }
   fetchMenu()
  },[])

  const saveMenu = async (e) => {
    e.preventDefault()
    setIsSubmit(true)
    const id = parseInt(menuCheck.current.value )

    const { data,error } = await supabase
    .from('menu')
    .update({
      menu_item:props.data.menusItem.saveMenu,
      is_check:true
    })
    .eq('id',id)
    if(error) {
      alert(`error ${error.message}`)
       console.log(error);
    }else{
      alert("save menu succes")
      console.log(data);
      window.location.reload()
    }
  }
  
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setNames({ [name]: value });
    let isChecked = e.target.checked;
    if (isChecked) {
      setMenusItem({ ...menusItem, menu: [...menusItem.menu, e.target.value] });
      console.log(menusItem.menu);
    } else {
      const copyArr = [...menusItem.menu]; // make a separate copy of the array
      const index = copyArr.indexOf(e.target.value);
      if (index !== -1) {
        // only splice array when item is found
        copyArr.splice(index, 1);
        setMenusItem({ ...menusItem, menu: copyArr });
        console.log(menusItem.menu);
      }
    }
  };

const createMenu = async (e) => {
    e.preventDefault()
    if(!names){
      alert("Input required")
      return
    }
   const { data,error } = await supabase
  .from('menu')
  .insert(
    {menu_name:names.menu}
    )
  .select()
  if(data){
    console.log(data);
    alert("Create menu succes")
    e.target.reset()
  }
  if(error) alert(error.message)
  }

  const deleteMenu = async (e) => {
    e.preventDefault()
    const id = parseInt(menuCheck.current.value )
    if(window.confirm('Are you sure want to delete this menu ? ')){
      const { error } = await supabase
      .from('menu')
      .delete()
      .eq('id', id)
      if(error) alert(`Something Wrong ${error.message}`)
      else alert('Delete menus success')
    }
  }
    return(
<div className='box bg-dark w-100'>
<form className='mb-3'  onSubmit={createMenu}>
<h3 className='is-bold is-title p-2 my-3 text-title'>
Create Menus</h3>
<div class="field has-addons">
  <div class="control">
    <input class="input" type="text" placeholder="Create Menu" name='menu' onChange={handlerChange}/>
  </div>
  <div class="control">
    <button class="button is-info">
      Create
    </button>
  </div>
</div>
</form>
<h3 className='is-bold is-title p-2 text-title'>
        Menu structure</h3>
        {/* ACCORDION */}
<div className='is-flex is-flex-column is-flex-gap-md'>
{Menu}
{menuList }
</div>
{/* create menu */}

{/* end create menu */}
        {/* END ACCORDION CONTANER */}
        <h3 className='is-bold is-title p-2 my-3 text-white'>
        Menu Setting</h3>
        <div className='is-flex px-2 is-flex-gap-lg'>
            <h3 className='is-size-7 text-white '>Display location</h3>
            <ul className='is-flex is-flex-column'>
            {menus.length < 1 ? "" : menus.map(menu => {

              return <li>
              <label class="b-checkbox checkbox">
              <input type="checkbox" value={menu.id} ref={menuCheck} onChange={handlerChange} defaultChecked={menu.is_check}/>
              <span class="check is-size-7 border-primary"></span>
               <span className='px-2 is-size-7 text-white'>{menu.menu_name}</span>
              </label>
            </li>

            })}
            </ul>
        </div>
        <form className='is-flex justify-between align-center' onSubmit={ saveMenu}>
            <span className='has-text-danger btn-transparent is-underlined is-size-6 is-clickable' onClick={deleteMenu}>Delete</span>
            <button className='button is-info'>Save Menus</button>
        </form>
      </div>
    )
}

export default MenusRight;
