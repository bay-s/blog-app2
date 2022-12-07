import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './register-form';
import supabase from '../supabase-config';
import RegisterPageLeft from './register-left';
import Headers from '../pages/headers';

class RegisterPages extends React.Component{
  constructor(){
    super()
    this.state = {
      hide:true,
      load:true,
      password:'',
      email:'',
      fullname:'',
      username:'',
      error:false,
      pesan:'',
      pesanSukses:'',
      sukses:false,
      disable:false,
      isSubmit:false,
    }
  }

  
  handlerChange = async (e) => {
    const {name,value} = e.target
    this.setState({
      [name]:value
    })
    console.log(value);
  }
  
   RegisterUser = async (e) => {
    e.preventDefault()
    if(!this.state.email || !this.state.password || !this.state.username || !this.state.fullname){
      this.setState({
        error:true,
        pesan:"Input field required"
      })
      return
    }if(/\s/.test(this.state.username)){
      this.setState({
        error:true,
        pesan:"Username can`t contain white space"
      })
      return
    }
     if(this.state.password.length < 7){
      this.setState({
        error:true,
        pesan:"Password atleast 8 character"
      })
      return
    }
    this.setState({
      error:false,
      isSubmit:true
    })

    const email =  this.state.email
    const password = this.state.password
    const { data, error } = await supabase.auth.signUp({
        email:email,
        password:password
      })

      if(error){
        console.log(error);
        this.setState({
          sukses:false,
          error:true,
          pesan:`Something wrong ${error.message} ${error.code}`,
          isSubmit:false
        })
      }

      if(data){
        console.log(data.user.id);
        console.log(data);
        this.setState({
          sukses:true,
          error:false,
          pesan:'Register Sukses',
          isSubmit:false
        })
      }
      this.insertDataUser(data.user.id)
  }
  

  insertDataUser = async (id) => {
    
    const {data,error} = await supabase 
    .from('users')
    .insert({
      username:this.state.username,
      fullname:this.state.fullname,
      email:this.state.email,
      avatar:'',
      uid:id
    })
    .select()
    if(error){
      console.log(error);
      this.setState({
        sukses:false,
        error:true,
        pesan:`Something wrong ${error.message} ${error.code}`,
        isSubmit:false
      })
    }
    if(data){
      console.log(data);
      this.setState({
        sukses:true,
        error:false,
        pesan:'Register Sukses',
        isSubmit:false
      })
    }
  }



     render(){

      return(
        <>
          <Headers />
<section className='container mt-3 mx-auto'>
<div className='columns is-centered is-multiline is-gapless'>
{/* start col left */}
<div className='column is-5 box bg-dark '>
 <RegisterPageLeft pesan={this.state.pesan} error={this.state.error} sukses={this.state.sukses}/>
</div>
 {/* end col left */}
<div className='column is-5  box bg-dark'>
<RegisterForm RegisterUser={this.RegisterUser} handlerChange={this.handlerChange} isSubmit={this.state.isSubmit} />
 <div class="field is-flex is-flex-gap-md is-justify-content-center pb-4">
   <p className='is-title text-white'>Already have an Account ?</p>
        <Link to='/login/' className='has-text-primary has-text-weight-bold is-title'>Login</Link>
 </div>
   </div>
   {/* END COLUMN RIGHT */}
 </div>
         {/* END COLUMNS */}
        </section>
        </>

            )

     }
}

export default RegisterPages;