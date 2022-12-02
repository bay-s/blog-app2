import React, { useEffect, useState } from 'react'
import supabase from '../supabase-config'


const MenusList = (props) => {

    return(
        <section class="accordions fade">
        <article class="accordion ">
        <div class="accordion-header has-background-white shadow p-4">
            <p className='text-dark is-title'>{props.menu}</p>
            <button class="toggle has-background-dark" aria-label="toggle" onClick={props.openCollapse}></button>
          </div>
          <div class="accordion-body">
            <div class="accordion-content border shadow p-2">
            <div className='is-flex align-center is-flex-gap-md'>
                <button className='has-text-danger btn-transparent' data-id={props.menus.id}onClick={props.removeMenu}>Remove</button>
                <span className='has-text-info'>|</span>
                <button className='has-text-info btn-transparent'>Cancel</button>
              </div>
            </div>
            {/* END ACCORDION CONTENT */}
            </div>
          {/* END ACCORDION BODY */}
        </article>
        {/* END ACCORDION ITEM */}
      </section>
    )
}

export default MenusList 