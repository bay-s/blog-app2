import React from 'react'

const Pagination = (props) => {
   const totalPage = props.totalPost - props.value.page
   const totalPages =  props.totalPost  / 2

  const nextPage = (e) => {
  e.preventDefault()
  props.setValue({... props.value,
    page: props.value.page + 4,
    counts: props.value.counts + 4,
    leftPage: props.totalPost -  props.value.counts
  })

}

const prevPage = (e) => {
  e.preventDefault()
  if( props.value.counts <= 1){

  }else{
    props.setValue({... props.value,
      page: props.value.page - 4,
      counts: props.value.counts - 4
    })
  }
}

console.log(props.value.page );
console.log(props.value.page <= 1);
    return(
<div className={props.value.page <= 4 ? 'hide' : 'py-5 px-4'}>   
<nav className="is-flex justify-center pagination is-medium" role="navigation" aria-label="pagination">
  <button className={props.value.page <= 1 ? "pagination-previous is-disabled is-small" : "pagination-previous hvr-sweep-to-right text-title is-outlined border-primary bg-transparent is-small"} onClick={props.value.page <= 1 ? '' : prevPage }>Previous</button>
  <button className={totalPage <= 4 ? "pagination-next  is-disabled is-small" : "pagination-next hvr-sweep-to-right text-title is-outlined border-primary bg-transparent is-small"} onClick={totalPage <= 4 ? '' : nextPage}>Next page
  </button>
</nav>
</div>
    )
}

export default Pagination;

