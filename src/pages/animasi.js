import React from 'react'
import '../animasi.css';

function Animasi(){

    return(
      <div className='column is-12 '> <div className="card-loader is-loading">
      <div className="image"></div>
      <div className="content-loader">
        <h2></h2>
        <p></p>
      </div>
    </div> 
    </div> 
    )
}

export default Animasi;