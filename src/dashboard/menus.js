import React, { useEffect, useRef, useState } from 'react'
import Header from '../pages/header';
import supabase from '../supabase-config';
import MenusLeft from './menus-left';
import MenusRight from './menus-right';
import Sidebar from './sidebar';


const Menus = () => {
    const [active,setActive] = useState(false)
    const [menusItem,setMenusItem] = useState({
        menu:[],
        saveMenu:[],
        tempMenu:[]
      })
   const [inputCheck,setInputCheck] = useState(null)
   const checkContainer = useRef(null)
      useEffect(() => {
        const fetchMenu = async () => {
       const { data, error } = await supabase
       .from('menu')
       .select()
       if(data){
         console.log(data);
         data.forEach(menus => {
          setMenusItem({...menusItem,
            saveMenu:[...menusItem. saveMenu,...menus.menu_item]
            })
            console.log(menusItem);
         })
       }if(error) console.log(error);
        }
        fetchMenu()
       },[])

    const openCollapse = (e) => {
        e.preventDefault()
        const collapse= e.target.parentElement.parentElement
        setActive(!active);
        collapse.classList.toggle('is-active')
       }

  const handlerChange = (e) => {
     let isChecked = e.target.checked;
     setInputCheck(e.target)
         if(isChecked){
          setMenusItem({...menusItem,
            menu:[...menusItem.menu,e.target.value]
            })
            console.log(menusItem.menu);
         }else{
       const copyArr = [...menusItem.menu]; // make a separate copy of the array
       const index = copyArr.indexOf(e.target.value)
       if (index !== -1) { // only splice array when item is found
         copyArr.splice(index, 1);
            setMenusItem({...menusItem,
              menu:copyArr 
              })
              console.log(menusItem.menu);
          }
         }

         
    }
    const addMenu = (e) => {
    e.preventDefault()
    setMenusItem({...menusItem,
     saveMenu:[...menusItem.saveMenu,...menusItem.menu],
     tempMenu:[...menusItem.tempMenu,...menusItem.menu]
      })
     inputCheck.checked = false
    }

    const removeMenu = e => {
      e.preventDefault()
      const copyArr = [...menusItem.saveMenu]; // make a separate copy of the array
      const container = e.target.parentElement.parentElement.parentElement.parentElement
      const index = copyArr.indexOf(e.target.parentElement.parentElement.parentElement.parentElement.firstChild.firstChild.firstChild.textContent)
      console.log(index);
      if (index !== -1) {
        copyArr.splice(index, 1);
       setMenusItem({...menusItem,
        saveMenu:copyArr 
          })
        container.classList.add('hide')
      }
     }

const data = {
    addMenu,
    handlerChange,
    removeMenu,
    menusItem,
    checkContainer
   }


    return(
<>
<div className='box shadow bg-dark'>
<h3 className='is-bold is-title is-size-4 text-title'>Menus</h3>
</div>
{/* END HEADER COLUMN */}
<div className='is-flex is-flex-gap-md sidebar-container'>
<MenusLeft openCollapse={openCollapse} data={data}/>
<MenusRight openCollapse={openCollapse} data={data} />
</div>
{/* END MENUS CONTAINER */}
</>
    )
}

export default Menus;





